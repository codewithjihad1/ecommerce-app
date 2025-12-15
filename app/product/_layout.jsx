import { Stack } from "expo-router";

export default function ProductLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* product/index.jsx */}
      <Stack.Screen name="index" />
      {/* product/[slug]/index.jsx */}
      <Stack.Screen name="[slug]" />

    </Stack>
  );
}
