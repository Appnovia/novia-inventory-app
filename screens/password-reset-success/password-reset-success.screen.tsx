import { Button } from "@/components/button";
import PasswordResetSuccessImage from "@/components/icons/PasswordResetSuccessImage";
import { Text } from "@/components/text";
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function PasswordResetSuccess() {

  return (
    <View className="items-center justify-center flex-1 bg-[#F5F5F5]">
      <View className="items-center justify-center w-full px-8">
        <PasswordResetSuccessImage />
        <Text className="text-center text-md font-poppins-medium tracking-wide leading-normal w-1/2">
          Password Reset Successful
        </Text>
        <Button onPress={() => router.replace('/login')} className="self-stretch w-full mt-20 rounded-xl font-poppins-medium">
          Done
        </Button>
      </View>
    </View>
  );
}