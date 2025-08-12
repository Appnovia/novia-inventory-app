import { Button } from '@/components/button';
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import useAxios from "@/hooks/useAxios";
import { resetPassword, sendOTP } from "@/services/api/auth";
import { useMutation } from '@tanstack/react-query';
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from 'react-native';
import Toast from "react-native-toast-message";


export default function ResetPasswordScreen() {
  const [step, setStep] = useState(1);
  const axios = useAxios();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const {
    control: resetPasswordControl,
    handleSubmit: resetPasswordHandleSubmit,
    formState: { errors: resetPasswordErrors }
  } = useForm({
    defaultValues: {
      token: '',
      password: '',
      confirmPassword: ''
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
  })

  const sendOtpMutation = useMutation({
    mutationFn: (email: string) => sendOTP(axios, email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (resetCredentials: any) =>
      resetPassword(axios, resetCredentials),
  });

  const handleSendCode = ({ email }: { email: string }) => {
    sendOtpMutation.mutate(email, {
      onSuccess: () => setStep(2),
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      },
    });
  }

  const handleResetPassword = (data: any) => {
    resetPasswordMutation.mutate(
      { email: getValues().email, ...data },
      {
        onSuccess: (data) => {
          Toast.show({
            type: 'success',
            text1: data.message,
          });
          router.replace('/password-reset-success');
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to reset password. Please try again.',
          });
        },
      }
    );
  };

  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <View className="flex-1 w-[92%] mx-auto">
        <View className="w-full flex-1 pt-[4%] h-full">
          {step === 1 && (
            <>
              <View className="flex gap-y-0">
                <Text className="text-2xl font-semibold font-poppins">Forgot your password?</Text>
                <Text className="text-[#3E3B54] font-poppins-regular">Type your email address and we will send the verification code.</Text>
              </View>
              <View className="w-full flex-1 gap-y-5 pt-7">
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "email address is required",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "A valid email address is required",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      labelFor="email"
                      aria-errormessage="inputError"
                      aria-labelledbyledBy="email"
                      placeholder="Enter your email"
                      value={value}
                      onChangeText={(text) => onChange(text.toLowerCase())}
                      hasError={!!errors.email}
                      errorMessage={errors.email?.message}
                    />
                  )}
                />
                <Button
                  className="rounded-xl font-poppins-medium mt-3"
                  onPress={handleSubmit(handleSendCode)}
                  disabled={sendOtpMutation.isPending}
                >Send reset code</Button>
              </View>
            </>
          )}
          {step === 2 && (
            <>
              <View className="flex gap-y-0">
                <Text className="text-2xl font-semibold font-poppins">Reset Your Password</Text>
                <Text className="text-[#3E3B54] font-poppins-regular">Enter the OTP sent to your email and choose a new password.</Text>
              </View>
              <View className="w-full flex-1 gap-y-5 pt-7">
                <Controller
                  control={resetPasswordControl}
                  rules={{
                    required: {
                      message: 'Please enter your OTP',
                      value: true,
                    }
                  }}
                  name="token"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      labelFor="token"
                      aria-errormessage="inputError"
                      aria-labelledbyledBy="token"
                      placeholder="Enter your OTP"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      hasError={!!resetPasswordErrors.token}
                      errorMessage={resetPasswordErrors.token?.message}
                    />
                  )}
                />
                <Controller
                  control={resetPasswordControl}
                  rules={{
                    required: {
                      message: 'Please enter your password',
                      value: true,
                    },
                    minLength: {
                      message: 'Password must contain at least 4 characters',
                      value: 4,
                    },
                  }}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      labelFor="password"
                      aria-labelledbyledBy="password"
                      aria-errormessage="inputError"
                      placeholder="Enter your password"
                      hasError={!!resetPasswordErrors.password}
                      errorMessage={resetPasswordErrors.password?.message}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      secureTextEntry
                    />
                  )}
                />
                <Controller
                  control={resetPasswordControl}
                  rules={{
                    required: {
                      message: 'Please re-enter your password',
                      value: true,
                    },
                    validate: {
                      passwordMismatch: (value, formValues) => {
                        return (
                          value === formValues.password ||
                          "Passwords don't match"
                        );
                      },
                    },
                  }}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      labelFor="confirmPassword"
                      aria-labelledbyledBy="confirmPassword"
                      placeholder="Confirm your password"
                      aria-errormessage="inputError"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      errorMessage={
                        resetPasswordErrors.confirmPassword?.message
                      }
                      secureTextEntry
                    />
                  )}
                />
                <Button
                  className="rounded-xl font-poppins-medium mt-3"
                  onPress={resetPasswordHandleSubmit(handleResetPassword)}
                  disabled={resetPasswordMutation.isPending}
                >{resetPasswordMutation.isPending
                  ? 'Resetting...'
                  : 'Reset Password'}</Button>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  )
}