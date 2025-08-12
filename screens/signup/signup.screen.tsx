import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import CustomDropdown from "@/components/common/dropdown";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { countries } from "@/configs/constants";
import useAxios from "@/hooks/useAxios";
import { registerUser } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import * as EmailValidator from "email-validator";
import { Link, router } from "expo-router";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

export default function SignupScreen() {
  const [checked, setChecked] = React.useState(false);
  const axios = useAxios();

  const { isPending, mutate } = useMutation({
    mutationFn: (formData: signUpData) => registerUser(axios, formData),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: data.message,
      });
      router.push({
        pathname: "/verify-otp",
        params: { email: data.data.email, userId: data.data.id },
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<signUpData>({
    defaultValues: {
      firstName: "",
      orgName: "",
      address: "",
      country: "",
      currency: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      jobTitle: "",
    },
  });

  const countryValue = useWatch({ control, name: "country" });
  const selectedCountryObj = countries.find((c) => c.value === countryValue);
  const currency = selectedCountryObj?.currency || null;

  React.useEffect(() => {
    if (currency) {
      setValue("currency", currency.value);
    } else {
      setValue("currency", "");
    }
  }, [currency, setValue]);

  const onSubmit = (data: signUpData) => {
    if (!checked) {
      alert("Please agree to the terms and conditions");
      return;
    }
    mutate(data);
  };

  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <View className="flex-1 w-[92%] mx-auto">
        <ScrollView
          className="w-full flex-1 pt-[4%]"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex gap-y-0">
            <Text className="text-2xl text-[#05030D] font-poppins">
              Create a new account
            </Text>
            <Text className=" text-[#3E3B54] font-poppins-regular">
              Create an account to access all features
            </Text>
          </View>
          <View className="w-full flex-1 gap-y-5 pt-7">
            <Controller
              control={control}
              name="firstName"
              rules={{ required: "First name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  labelFor="firstName"
                  aria-labelledbyledBy="firstName"
                  aria-errormessage="inputError"
                  placeholder="Enter your first name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  hasError={!!errors.firstName}
                  errorMessage={errors.firstName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              rules={{ required: "Last name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  labelFor="lastName"
                  aria-labelledbyledBy="lastName"
                  aria-errormessage="inputError"
                  placeholder="Enter your last name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  hasError={!!errors.lastName}
                  errorMessage={errors.lastName?.message}
                />
              )}
            />
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
              name="phone"
              rules={{ required: "Phone number is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  labelFor="phone"
                  aria-labelledbyledBy="phone"
                  aria-errormessage="inputError"
                  placeholder="Enter your phone number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                  hasError={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="orgName"
              rules={{ required: "Organization name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  labelFor="orgName"
                  aria-labelledbyledBy="orgName"
                  aria-errormessage="inputError"
                  placeholder="Enter organization name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  hasError={!!errors.orgName}
                  errorMessage={errors.orgName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="jobTitle"
              rules={{ required: "Job title is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  labelFor="jobTitle"
                  aria-labelledbyledBy="jobTitle"
                  aria-errormessage="inputError"
                  placeholder="Enter job title"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  hasError={!!errors.jobTitle}
                  errorMessage={errors.jobTitle?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              rules={{ required: "Address is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  labelFor="address"
                  aria-labelledbyledBy="address"
                  placeholder="Enter your address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  hasError={!!errors.address}
                  errorMessage={errors.address?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="country"
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <>
                  <CustomDropdown
                    data={countries}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Country"
                  />
                  {errors.country && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.country.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="currency"
              rules={{ required: "Currency is required" }}
              render={({ field }) => (
                <>
                  <CustomDropdown
                    data={currency ? [currency] : []}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={
                      currency ? "Currency" : "Select a country first"
                    }
                    disabled={!currency}
                  />
                  {errors.currency && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.currency.message}
                    </Text>
                  )}
                </>
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
                  placeholder="Enter your password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  hasError={!!errors.password}
                  errorMessage={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
            <View className="flex-row gap-3 mb-4 items-center mt-2">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              <View className="flex-row flex-wrap">
                <Text className="text-[#3E3B54] font-poppins-regular">
                  By creating an account, you agree to our?
                </Text>
                <Pressable
                  onPress={() => router.push("/(routes)/user-agreement")}
                >
                  <Text className="text-[#FF6347] font-poppins-medium">
                    User Agreement and
                  </Text>
                </Pressable>
                <Text className="text-[#3E3B54] font-poppins-regular ml-1">
                  Terms
                </Text>
                <Pressable
                  onPress={() => router.push("/(routes)/user-agreement")}
                >
                  <Text className="text-[#FF6347] font-poppins-medium ml-1">
                    & Conditions
                  </Text>
                </Pressable>
              </View>
            </View>
            <Button
              className="rounded-xl font-poppins-medium"
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
              size="lg"
            >
              {isPending ? "Creating..." : "Create new account"}
            </Button>
            <View className="flex-row justify-center gap-x-1 mt-2 mb-20">
              <View>
                <Text className="text-[#3E3B54] font-poppins-regular">
                  Already have an account?{" "}
                </Text>
                {/* <View className="w-full bg-[#3E3B54] h-[2px]" /> */}
              </View>
              <Link push href="/login" asChild>
                <Text className="font-poppins-bold underline">Sign in</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
