import { View } from "react-native";
import { Text } from "./text";

export default function Header({ title }: { title: string }) {
  return (
    <View className="flex-col mt-5">
      <View className="flex-row justify-center">
        <Text className="font-poppins-bold text-xl text-[#1C0F0D]">
          {title}
        </Text>
      </View>
    </View>
  );
}
