import NLWLogo from "../assets/nlw-spacetime-logo.svg";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import {
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets();
  const [isPublic, setIsPublic] = useState(false);
  return (
    <ScrollView
      className="flex-1 px-8"
        contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex mt-4 flex-row items-center justify-between">
        <NLWLogo />

        <Link asChild href="/memories">
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Feather name="arrow-left" size={16} color={"#fefefe"} />
          </TouchableOpacity>
        </Link>
      </View>
      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            className=""
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: "#767577", true: "#372560" }}
            thumbColor={isPublic ? "#9b79ea" : "#9e9ea0"}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar Memoria Publica
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-black/20 h-32 items-center justify-center rounded-lg border-dashed border border-gray-500"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="image" color={"#fefefe"} />
            <Text className="font-body text-sm text-gray-200">
              Adicionar Foto ou Video de capa
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quibusdam consequuntur!"
        />
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full items-center self-end bg-green-500 px-5 py-3"
        >
          <Text className="text-center font-alt uppercase text-sm text-black">
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
