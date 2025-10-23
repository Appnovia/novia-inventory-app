import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { useAuth } from "@/hooks/auth";
import { registerForPushNotificationsAsync } from "@/hooks/notification";
import useAxios from "@/hooks/useAxios";
import { loginUser, updateToken } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import * as EmailValidator from "email-validator";
import { Link, router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const axios = useAxios();
  const { setSession, user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    defaultValues: {
      email: user?.email || "",
      password: "",
    },
  });

  const updatePushTokenMutation = useMutation({
    mutationFn: (payload: { email: string; token: string }) =>
      updateToken(axios, payload),
    onSuccess: () => {
      console.log("Push token updated successfully");
    },
    onError: (err) => {
      console.error("Failed to update push token", err);
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (formData: loginData) => loginUser(axios, formData),
    onSuccess: async (data) => {
      Toast.show({
        type: "success",
        text1: "Login Successfully",
      });

      const { token, user } = data;
      // console.log(token, user);

      const pushToken = await registerForPushNotificationsAsync();
      console.log("Expo Push Token:", pushToken);

      if (pushToken) {
        updatePushTokenMutation.mutate({
          email: user.email,
          token: pushToken,
        });
      }

      setSession({
        token,
        user,
      });

      router.replace("/(tabs)");
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    },
  });

  const onSubmit = (data: loginData) => {
    mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5] pt-8">
      <View className="flex-1 w-[92%] mx-auto">
        <ScrollView
          className="w-full flex-1 pt-[4%]"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex gap-y-0">
            <Text className="text-2xl font-semibold font-poppins">
              Welcome back
            </Text>
            <Text className="text-[#3E3B54] font-poppins-regular">
              Continue where you left off by logging in
            </Text>
          </View>
          <View className="w-full flex-1 gap-y-5 pt-7">
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                validate: (value) =>
                  EmailValidator.validate(value) || "Invalid email address",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  labelFor="email"
                  aria-labelledbyledBy="email"
                  aria-errormessage="inputError"
                  placeholder="Enter your email"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text.toLowerCase())}
                  value={value}
                  hasError={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  labelFor="password"
                  aria-labelledbyledBy="password"
                  aria-errormessage="inputError"
                  placeholder="Enter your password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  hasError={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <View className="flex-row justify-end mb-4">
              <Pressable
                className="flex-col"
                onPress={() => router.push("/(routes)/reset-password")}
              >
                <Text className="text-[#FF6347] font-poppins-regular underline">
                  Forgot Password?
                </Text>
                {/* <View className="w-full bg-[#FF6347] h-[2px]" /> */}
              </Pressable>
            </View>
            <Button
              className="rounded-xl font-poppins-medium"
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
              size="lg"
            >
              {isPending ? "Signing in" : "Sign in"}
            </Button>
            <View className="flex-row justify-center gap-x-1">
              <View>
                <Text className="text-[#3E3B54] font-poppins-regular">
                  Don’t have an account?
                </Text>
              </View>
              <Link push href="/signup">
                <Text className="font-poppins-bold underline">
                  Create account
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
