import React, { useEffect, useState } from "react";
import NLWLogo from "../assets/nlw-spacetime-logo.svg";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { Image, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface Memory {
  coverUrl: string;
  excerpt: string;
  id: string;
  createdAt: string;
}
export default function Memories() {
  const { bottom, top } = useSafeAreaInsets();
  const [memories, setMemories] = useState<Memory[]>([]);
  const navigation = useNavigation();
  async function handleSignOut() {
    await SecureStore.deleteItemAsync("token");
    navigation.dispatch({ type: "POP_TO_TOP" });
  }

  async function getMemories() {
    try {
      const token = await SecureStore.getItemAsync("token");
      const { data } = await api.get<Memory[]>("/memories", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (data?.length) {
        setMemories(
          data
            .map((item) => {
              if (item.createdAt) {
                item.createdAt = dayjs(item.createdAt)
                  .locale("pt-br")
                  .format("DD [de] MMMM YYYY");
              }
              return item;
            })
            .filter((item) => item.coverUrl && item.excerpt && item.createdAt)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMemories();
  }, []);
  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between ">
        <NLWLogo />

        <View className="flex-row gap-2 ">
          <TouchableOpacity
            onPress={handleSignOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-400"
          >
            <Feather name="log-out" size={16} color={"#fefefe"} />
          </TouchableOpacity>
          <Link asChild href="/new">
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Feather name="plus" size={16} color={"#fefefe"} />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View className="mt-6 space-y-10">
        {memories.map(({ id, coverUrl, createdAt, excerpt }) => {
          return (
            <View className="space-y-4" key={id}>
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {createdAt}
                </Text>
              </View>
              <View className="space-y-4">
                <Image
                  source={{
                    uri: coverUrl,
                  }}
                  className="aspect-video w-full rounded-lg"
                  alt=""
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {excerpt}
                </Text>
                <Link href={`/memories/${id}`} asChild>
                  <TouchableOpacity className="flex-row items-center">
                    <Text
                      style={{ color: "#9e9ea0" }}
                      className="font-body text-sm "
                    >
                      Ler mais
                    </Text>
                    <Feather
                      name="arrow-right"
                      className="ml-2"
                      size={16}
                      color={"#9e9ea0"}
                    />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
