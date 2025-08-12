import { SearchIcon } from "lucide-react-native";
import { View } from "react-native";
import { Input } from "./input";

export default function Search({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}) {
  return (
    <View className="flex flex-row gap-4 py-6">
      <View className="flex-1 relative">
        <View className="absolute bottom-5 left-5 z-10">
          <SearchIcon size={20} color="#994D52" />
        </View>
        <Input
          placeholder="Search by name"
          className="pl-14"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  );
}
