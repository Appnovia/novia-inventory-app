import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Text } from "@/components/text";
import { cn } from "@/constants/utils";
import { useAuth } from "@/hooks/auth";
import { formatValue, getCurrencySymbol } from "@/hooks/general";
import useAxios from "@/hooks/useAxios";
import { getDashboard } from "@/services/api/dashboard";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AVATAR_URI = "https://github.com/mrzachnugent.png";
const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const axios = useAxios();
  const { session } = useAuth();
  const orgId = session?.user?.orgId;

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(axios, orgId),
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <View className="flex-1 w-[92%] mx-auto">
        <Header />
        <ScrollView showsVerticalScrollIndicator={false} className="h-full">
          <Overview
            inventory={data?.inventoryValue}
            item={data?.totalItems || 0}
            sales={data?.salesOrders?.count || 0}
            salesValue={data?.salesOrders?.value || 0}
            purchase={data?.purchaseOrders?.count || 0}
            purchaseValue={data?.purchaseOrders?.value || 0}
          />
          <OrdersTable orders={data?.recentSalesOrders} />
          <Inventory lowStockItems={data?.lowStockItems} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function Title({ title, marginTop }: TitleProps) {
  return (
    <Text
      className={cn(
        "tracking-wide leading-normal text-base-color text-xl font-poppins-bold mb-4",
        marginTop && "mt-6"
      )}
    >
      {title}
    </Text>
  );
}

function Header() {
  const { session } = useAuth();
  const user = session?.user;
  return (
    <View className="flex-col my-5">
      <View className="flex-row justify-between items-center">
        {/* <View /> */}
        <Text className="font-poppins-bold text-lg text-sec-color">
          Hi {user?.firstName + " " + user?.lastName}
        </Text>
        <View className="flex-row items-center gap-1">
          {/* <Pressable>
            <Feather name="bell" size={24} color="#1C0F0D" />
          </Pressable> */}
          <Avatar alt="Zach Nugent's Avatar">
            <AvatarImage source={{ uri: AVATAR_URI }} />
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      </View>
    </View>
  );
}

function StatCard({ title, value, side, type }: StatProps) {
  const { session } = useAuth();
  const curr = session?.user?.organisation?.currency;

  const currency = getCurrencySymbol(curr as string);

  return (
    <View
      className={cn(
        "flex-1 min-w-[45%] border border-gray-300 rounded-lg p-5 m-2",
        side === "left" ? "ml-0" : "mr-0"
      )}
    >
      <Text className="text-base text-gray-500 font-poppins-medium text-md">
        {title}
      </Text>
      <Text className="text-xl text-[#1C0F0D] font-poppins-bold mt-1">
        {type === "cash" ? `${currency}${formatValue(value)}` : value}
      </Text>
    </View>
  );
}

function Overview({
  inventory,
  item,
  sales,
  purchase,
  salesValue,
  purchaseValue,
}: any) {
  return (
    <View className="flex-col">
      <Title title="Overview" />
      <View className="flex-row flex-wrap justify-between">
        <StatCard
          title="Inventory Value"
          value={inventory}
          side="left"
          type="cash"
        />
        <StatCard title="Total Items" value={item} side="right" type="count" />
        <StatCard title="Sales Orders" value={sales} side="left" type="count" />
        <StatCard
          title="Purchase Orders"
          value={purchase}
          side="right"
          type="count"
        />
        <StatCard
          title="Sales Value"
          value={salesValue}
          side="left"
          type="cash"
        />
        <StatCard
          title="Purchase Value"
          value={purchaseValue}
          side="right"
          type="cash"
        />
      </View>
    </View>
  );
}

function Inventory({ lowStockItems }: any) {
  return (
    <View className="py-6">
      <Title title="Low Stock Alert (5 items)" />

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#FF6347",
          padding: 10,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Text
          style={{ flex: 2 }}
          className="font-poppins-bold text-white text-sm"
        >
          Item
        </Text>
        <Text
          style={{ flex: 2 }}
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-poppins-bold text-white text-sm"
        >
          Location
        </Text>
        <Text
          style={{ flex: 1 }}
          className="font-poppins-bold text-white text-sm"
        >
          Qty
        </Text>
        <Text
          style={{ flex: 1 }}
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-poppins-bold text-white text-sm"
        >
          Reserved
        </Text>
      </View>

      {lowStockItems &&
        lowStockItems.map((entry: any, index: number) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text
              style={{ flex: 2 }}
              numberOfLines={1}
              ellipsizeMode="tail"
              className="font-poppins-regular text-sm"
            >
              {entry.item.name}
            </Text>
            <Text
              style={{ flex: 2 }}
              numberOfLines={1}
              ellipsizeMode="tail"
              className="font-poppins-regular text-sm"
            >
              {entry.location.name}
            </Text>
            <Text
              style={{ flex: 1 }}
              numberOfLines={1}
              ellipsizeMode="tail"
              className="font-poppins-regular text-sm"
            >
              {entry.quantity}
            </Text>
            <Text
              style={{ flex: 1 }}
              numberOfLines={1}
              ellipsizeMode="tail"
              className="font-poppins-regular text-sm"
            >
              {entry.reservedQuantity}
            </Text>
          </View>
        ))}
    </View>
  );
}

function OrdersTable({ orders }: { orders: any[] }) {
  const { session } = useAuth();
  const curr = session?.user?.organisation?.currency;
  const currency = getCurrencySymbol(curr as string);
  return (
    <View className="py-6 mt-5">
      <View>
        <Title title="Recent Orders" />
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#FF6347",
            padding: 10,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <Text
            style={{ flex: 2 }}
            numberOfLines={1}
            ellipsizeMode="tail"
            className="font-poppins-bold text-white text-sm"
          >
            Customer
          </Text>
          <Text
            style={{ flex: 1 }}
            numberOfLines={1}
            ellipsizeMode="tail"
            className="font-poppins-bold text-white text-sm"
          >
            Paid
          </Text>
          <Text
            style={{ flex: 1 }}
            numberOfLines={1}
            ellipsizeMode="tail"
            className="font-poppins-bold text-white text-sm"
          >
            Total
          </Text>
        </View>

        {orders &&
          orders.map((order, index) => (
            <View
              key={order.id}
              style={{
                flexDirection: "row",
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#ddd",
              }}
            >
              <Text
                style={{ flex: 2 }}
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-poppins-regular text-sm"
              >
                {order.customer.name}
              </Text>
              <Text
                style={{ flex: 1 }}
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-poppins-regular text-sm"
              >
                {currency}
                {formatValue(order.amountPaid)}
              </Text>
              <Text
                style={{ flex: 1 }}
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-poppins-regular text-sm"
              >
                {currency}
                {formatValue(order.total)}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
}
