import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="inicialrota" options={{ headerShown: false}}/>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
    </Stack>
  )
}
