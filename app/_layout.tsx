import toastConfig from "@/configs/toast";
import AuthProvider from "@/hooks/auth";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import "../global.css";
import Nav from "@/components/nav";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/onboarding/index" />
          <Stack.Screen name="(routes)/signup" />
          <Stack.Screen name="(routes)/login" />
          <Stack.Screen name="(routes)/reset-password" />
          <Stack.Screen name="(routes)/user-agreement/index" /> */}
        </Stack>
        <Toast config={toastConfig} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
