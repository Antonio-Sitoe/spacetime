import React, { useEffect, useState } from "react";
import "../lib/dayjs";

import BlurBg from "../assets/bg-blur.png";
import Stripes from "../assets/stripes.svg";
import { styled } from "nativewind";
import * as SecureStore from "expo-secure-store";

import { ImageBackground, StatusBar } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

const StyledStripes = styled(Stripes);

export default function RootLayout() {
  const [isUserAuthenticated, SetisUserAuthenticated] = useState(false);
  const [fontsLoading] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) =>
      SetisUserAuthenticated(!!token)
    );
  }, []);

  if (!fontsLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <ImageBackground
        source={BlurBg}
        imageStyle={{ position: "absolute", left: "-50%" }}
        className="flex-1 relative  bg-gray-900"
      >
        <StyledStripes className="absolute left-2" />
        <StatusBar barStyle="light-content" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
            animation:"fade"
          }}
        >
          <Stack.Screen name="index" redirect={isUserAuthenticated} />
          <Stack.Screen name="memories" />
          <Stack.Screen name="new" />
        </Stack>
      </ImageBackground>
    </>
  );
}
