import { Stack } from "expo-router";

export default function CheckOutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* product/index.jsx */}
      <Stack.Screen name="index" />
    </Stack>
  );
}
