import { store } from "@/src/store/index";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import "../global.css";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    Poppins: require("../assets/font/Poppins-Regular.ttf"),
    RalewayBold:require("../assets/font/Raleway-Bold.ttf"),
    Raleway: require("../assets/font/Raleway-Regular.ttf"),
    PoppinsBold: require("../assets/font/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    // console.log(fontsError);
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product" options={{headerShown:false }} />
      </Stack>
    </Provider>
  );
}
