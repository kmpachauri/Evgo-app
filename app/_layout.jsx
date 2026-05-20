import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { AppProvider, useApp } from "../context/AppContext";
import GlobalLoader from "../components/GlobalLoader";

function AuthGate() {
  const { isLoggedIn, initialized } = useApp();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;
    const timer = setTimeout(() => {
      const inAuthGroup = segments[0] === "(tabs)";
      const inPublic =
        segments[0] === "login" ||
        segments[0] === "register" ||
        segments[0] === "congratulations" ||
        segments[0] === "splash";

      if (!isLoggedIn && !inPublic) {
        router.replace("/login");
      } else if (isLoggedIn && !inAuthGroup) {
        router.replace("/(tabs)");
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isLoggedIn, initialized, segments]);

  return <Slot />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AppProvider>
          <AuthGate />
        </AppProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
      <Toast topOffset={60} />
      <GlobalLoader />
    </View>
  );
}
