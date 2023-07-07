import React, { useEffect } from "react";

import { api } from "../lib/axios";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import NLWLogo from "../assets/nlw-spacetime-logo.svg";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/903f5252f0677103d4ec",
};

export default function Home() {
  const router = useRouter();
  const [_, response, signWithGitHub] = useAuthRequest(
    {
      clientId: "903f5252f0677103d4ec",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "acme",
      }),
    },
    discovery
  );
  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: "acme",
    //   })
    // );
    if (response?.type === "success") {
      const { code } = response.params;
      api
        .post("/register", {
          code,
        })
        .then(async (response) => {
          const { token } = response.data;
          console.log("token", token);
          await SecureStore.setItemAsync("token", token);
          router.push("/memories");
        })
        .catch((e) => {
          console.log("e", e);
        });
    }
  }, [response]);

  return (
    <>
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
          <Text className="text-center text-2xl font-title leading-tight text-gray-50">
            Sua capsula do tempo
          </Text>
          <Text className="text-center leading-relaxed font-body text-gray-100 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
            consequuntur odio
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => signWithGitHub()}
        >
          <Text className="text-center font-alt uppercase text-sm text-black">
            Cadastrar lembranca
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com amor Antonio Sitoe
      </Text>
    </>
  );
}
