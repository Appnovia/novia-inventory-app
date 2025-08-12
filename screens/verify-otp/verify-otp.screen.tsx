import { Button } from '@/components/button';
import { Text } from "@/components/text";
import useAxios from "@/hooks/useAxios";
import { sendOTP, validateOTP } from "@/services/api/auth";
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, View } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import Toast from "react-native-toast-message";


export default function VerifyOtpScreen() {
  const axios = useAxios()
  const otpInputRef = useRef<any>(null);
  const { email, userId } = useLocalSearchParams<{ email: string; userId: string }>();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState<number>(59);
  const [isCounting, setIsCounting] = useState<boolean>(true);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0) {
      setIsCounting(false);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown, isCounting]);

  const validateOtpMutation = useMutation({
    mutationFn: async (otpData: { userId: string; otp: string }) =>
      validateOTP(axios, otpData),
  });

  const resendOtpMutation = useMutation({
    mutationFn: (email: string) => sendOTP(axios, email),
  });


  const handleVerifyOtp = () => {
    validateOtpMutation.mutate(
      { userId: userId, otp },
      {
        onSuccess: () => router.push('/login'),
        onError: (error) => {
          otpInputRef.current?.clear();
          Toast.show({
            type: 'error',
            text1: 'Invalid OTP. Please try again.',
          });
        },
      }
    );
  };

  const handleResendCode = () => {
    setCountdown(59);
    setIsCounting(true);

    resendOtpMutation.mutate(email, {
      onSuccess: (data) => {
        Toast.show({
          type: 'success',
          text1: 'OTP resent successfully!',
        });
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Failed to resend OTP. Please try again.',
        });
      },
    });
  };


  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <View className="flex-1 w-[92%] mx-auto">
        <View className="w-full flex-1 pt-[4%]">
          <View className="flex gap-y-0">
            <Text className="text-2xl font-semibold font-poppins">Verify reset code</Text>
            <View className="flex-col flex-wrap">
              <Text className="text-[#3E3B54] font-poppins-regular">Enter code that we have sent to your email</Text>
              <Text className="text-[#161518] font-poppins-regular">{email}</Text>
            </View>
          </View>
          <View className="w-full flex-1 gap-y-5 pt-7">
            <OTPTextInput
              ref={otpInputRef}
              inputCount={6}
              textInputStyle={{
                color: '#994D52',
                borderWidth: 0,
                borderBottomWidth: 0,
                height: 55,
                width: 55,
                backgroundColor: '#F2E8E8',
                borderRadius: 7,
                shadowColor: '#F5F5F5',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 2,
                elevation: 2,
              }}
              handleTextChange={(v: string) => setOtp(v)}
            />
            <View className="flex-row mb-6">
              <Text className="text-[#3E3B54] font-poppins-regular">Didn't get code? </Text>
              <Pressable disabled={isCounting} onPress={handleResendCode}>
                <Text
                  className={`font-poppins-bold ${isCounting ? 'text-[#3E3B54]' : 'text-[#161518]'
                    }`}
                >
                  {isCounting
                    ? `Resend code in ${countdown}s`
                    : 'Resend code'}
                </Text>
              </Pressable>
            </View>
            <Button className="rounded-xl font-poppins-medium mt-3" onPress={handleVerifyOtp}>Verify OTP</Button>
          </View>
        </View>
      </View>
    </View>
  )
}