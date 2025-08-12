import { useRoute } from "@react-navigation/native";
import { Text } from "@/components/text";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getSalesOrderById } from "@/services/api/dashboard";
import useAxios from "@/hooks/useAxios";
import moment from "moment";
import { useLocalSearchParams } from "expo-router";
import { getCurrencySymbol } from "@/hooks/general";
import { useAuth } from "@/hooks/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "@/components/nav";

export default function SalesReport() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const axios = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["sales-order", id],
    queryFn: () => getSalesOrderById(axios, id),
  });
  const order = data?.salesOrder;
  const { session } = useAuth();
  const currency = getCurrencySymbol(
    session?.user?.organisation?.currency as string
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <Nav title="Sales Report" />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#FF6347"
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView className="bg-white p-6 rounded-lg shadow-sm">
          {/* Header */}
          <View className="pb-4 border-b border-gray-200">
            <Text className="font-poppins-medium text-lg text-tomato-600">
              Order Details
            </Text>
            {/* <Text className="text-gray-500 mt-1">View of the order</Text> */}
          </View>

          {/* Order Info */}
          <View className="mt-4">
            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Order ID:
              </Text>
              <Text className="font-poppins-regular text-sm">
                {order?.orderNumber}
              </Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Status:
              </Text>
              <View
                className={`px-2 py-1 rounded-full ${order?.status === "COMPLETED" ? "bg-green-100" : "bg-red-100"}`}
              >
                <Text
                  className={`text-green-800  font-poppins-regular text-sm ${order?.status === "COMPLETED" ? "text-green-800" : "text-red-800"}`}
                >
                  {order?.status}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Payment:
              </Text>
              <View className="bg-blue-100 px-2 py-1 rounded-full">
                <Text className="text-blue-800  font-poppins-regular text-sm">
                  {order?.paymentStatus}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Order Date:
              </Text>
              <Text className="font-poppins-light text-sm">
                {moment(order?.createdAt).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Placed By:
              </Text>
              <Text className="font-poppins-light text-sm">
                {order?.createdBy?.name}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Customer:
              </Text>
              <Text className="font-poppins-light text-sm">
                {order?.customer?.name}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-poppins-light text-sm text-gray-600">
                Location:
              </Text>
              <Text className="font-poppins-light text-sm">
                {order?.location?.name}
              </Text>
            </View>
          </View>

          {/* Order Items */}
          <View className="mt-6">
            <Text className="text-lg font-poppins-regular  text-tomato-600 mb-3">
              Order Items
            </Text>

            {/* Table Header */}
            <View className="flex-row bg-base-color p-2 rounded-t-lg">
              <Text className="flex-1 font-poppins-regular text-sm text-white">
                Item
              </Text>
              <Text className="w-20 font-poppins-regular text-sm text-white text-right">
                Price
              </Text>
              <Text className="w-12 font-poppins-regular text-sm text-white text-center">
                Qty
              </Text>
              <Text className="w-20 font-poppins-regular text-sm text-white text-right">
                Total
              </Text>
            </View>

            {/* Table Rows */}
            <View className="border-b border-l border-r border-gray-200">
              {order?.lines?.map((item: any, idx: number) => (
                <View
                  key={idx}
                  className="flex-row p-2 border-t border-gray-200"
                >
                  <Text className="flex-1 font-poppins-light text-sm">
                    {item?.item?.name}
                  </Text>
                  <Text className="w-20 text-right font-poppins-light text-sm">
                    {currency + item?.unitPrice.toLocaleString()}
                  </Text>
                  <Text className="w-12 text-center font-poppins-light text-sm">
                    {item?.quantity}
                  </Text>
                  <Text className="w-20 text-right font-poppins-light text-sm">
                    {currency + item?.total.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Totals */}
          <View className="mt-6">
            <View className="flex-row justify-between py-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Subtotal:
              </Text>
              <Text className="font-poppins-light text-sm">
                {currency + order?.subtotal.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between py-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Discount:
              </Text>
              <Text className="font-poppins-light text-sm text-green-600">
                {currency + order?.discount.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between py-2 border-t border-gray-200 mt-2">
              <Text className="font-poppins-medium text-sm text-base-color">
                Total:
              </Text>
              <Text className="font-poppins-medium text-md text-tomato-600">
                {currency + order?.total.toLocaleString()}
              </Text>
            </View>
          </View>
          <View className="mt-4 border border-gray-300 rounded-lg p-4">
            <Text className="font-poppins-bold text-md font-bold text-gray-900 mb-2">
              Order Info
            </Text>
            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Created:
              </Text>
              <Text className="font-poppins-light text-sm text-gray-900">
                {moment(order?.createdAt).format("DD MMM YYYY")}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Last Updated:
              </Text>
              <Text className="font-poppins-light text-sm text-gray-900">
                {moment(order?.updatedAt).format("DD MMM YYYY")}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
