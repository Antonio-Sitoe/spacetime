import React from "react";
import "../lib/dayjs";

import { StatusBar } from "react-native";
import { SplashScreen, Slot } from "expo-router";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

export default function RootLayout() {
  const [fontsLoading] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoading) {
    return <SplashScreen />;
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Slot />
    </>
  );
}
