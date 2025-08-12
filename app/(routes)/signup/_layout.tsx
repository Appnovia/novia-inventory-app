import BackIcon from "@/components/icons/BackIcon";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
// import { scale } from "react-native-size-matters";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#F5F5F5" },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                // gap: scale(5),
              }}
              onPress={() => router.back()}
            >
              <BackIcon />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
