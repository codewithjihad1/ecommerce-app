import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  return (
    
     <ThemeProvider value={useColorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ drawerLabel: "Home", headerShown:false }} />
          <Stack.Screen name="dashboard" options={{ drawerLabel: "Dashboard" }} />
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>

    
  );
}
