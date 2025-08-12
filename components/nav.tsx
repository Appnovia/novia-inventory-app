import React from "react";
import { Pressable, View } from "react-native";
import { router, Stack } from "expo-router";
import BackIcon from "./icons/BackIcon";
import { Text } from "./text";

export default function Nav({ title }: { title: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 5,
        padding: 15,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderBottomColor: "#ddd",
        marginBottom: 8,
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Pressable onPress={() => router.back()}>
        <BackIcon />
      </Pressable>
      <Text className="font-poppins-bold text-lg text-base-color">{title}</Text>
      <View />
    </View>
  );
}
