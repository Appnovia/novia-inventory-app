import HomeIcon from "@/components/icons/Home";
import InventoryIcon from "@/components/icons/Inventory";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar, View } from "react-native";

export default function _layout() {
  return (
    <View className="flex-1 relative">
      <StatusBar backgroundColor={"#FF6347"} barStyle="default" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 66,
            marginHorizontal: 16,
            marginBottom: 20,
            borderRadius: 12,
            paddingBottom: 6,
            paddingTop: 10,
            justifyContent: "center",
          },
          tabBarInactiveTintColor: "#B0B0B0",
          tabBarActiveTintColor: "#FF6347",
          tabBarIconStyle: {
            fontSize: 20,
          },
          tabBarLabelStyle: {
            fontFamily: "Poppins_600SemiBold",
            fontSize: 11,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                size={23}
                color={focused ? "#FF6347" : "#B0B0B0"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="inventory"
          options={{
            title: "Inventory",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="database"
                size={23}
                color={focused ? "#FF6347" : "#B0B0B0"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="sales"
          options={{
            title: "Sales",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="shopping-cart"
                size={23}
                color={focused ? "#FF6347" : "#B0B0B0"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="purchase"
          options={{
            title: "Purchase",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="shopping-bag"
                size={23}
                color={focused ? "#FF6347" : "#B0B0B0"}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="reports/index"
          options={{
            title: "Reports",
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="barchart"
                size={23}
                color={focused ? "#FF6347" : "#B0B0B0"}
              />
            ),
          }}
        /> */}
      </Tabs>
    </View>
  );
}
