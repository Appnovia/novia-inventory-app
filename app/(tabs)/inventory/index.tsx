import React, { useState } from "react";
import { Text, View, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentStock from "./components/current-stock";
import LowStock from "./components/low-stock";

const TABS = ["Current Stock", "Low Stock"];

export default function StockScreen() {
  const [activeTab, setActiveTab] = useState("Current Stock");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#F5F5F5",
        width: "92%",
        alignSelf: "center",
      }}
    >
      {/* Button Tabs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          // marginBottom: 16,
        }}
      >
        {TABS.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? "#FF6347" : "#e0e0e0",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              marginHorizontal: 8,
            }}
          >
            <Text
              style={{
                color: activeTab === tab ? "#fff" : "#333",
                fontWeight: "600",
              }}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      {activeTab === "Current Stock" ? <CurrentStock /> : <LowStock />}
    </SafeAreaView>
  );
}
