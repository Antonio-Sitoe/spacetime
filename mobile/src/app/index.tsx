import React, { useEffect } from "react";
import BlurBg from "../assets/bg-blur.png";
import Stripes from "../assets/stripes.svg";
import { styled } from "nativewind";
import { View, Text, ImageBackground } from "react-native";
import NLWLogo from "../assets/nlw-spacetime-logo.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { api } from "../lib/axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/903f5252f0677103d4ec",
};

const StyledStripes = styled(Stripes);

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
          router.push("/memories")
        })
        .catch((e) => {
          console.log("e", e);
        });
    }
  }, [response]);

  return (
    <ImageBackground
      source={BlurBg}
      imageStyle={{ position: "absolute", left: "-50%" }}
      className="flex-1 items-center justify-center  bg-gray-900 px-8 py-10"
    >
      <StyledStripes className="absolute left-2" />

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
    </ImageBackground>
  );
}
