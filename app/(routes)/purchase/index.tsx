import { Text } from "@/components/text";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrderById } from "@/services/api/dashboard";
import useAxios from "@/hooks/useAxios";
import moment from "moment";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/hooks/auth";
import { getCurrencySymbol } from "@/hooks/general";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "@/components/nav";

export default function PurchaseReport() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const axios = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["purchase-order", id],
    queryFn: () => getPurchaseOrderById(axios, id),
  });
  const order = data?.purchaseOrder;

  const { session } = useAuth();
  const currency = getCurrencySymbol(
    session?.user?.organisation?.currency as string
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <Nav title="Purchase Report" />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#FF6347"
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView className="bg-white p-6 rounded-lg shadow-sm">
          <View className="pb-4 border-b border-gray-200">
            <Text className="font-poppins-medium text-xl">Order Details</Text>
          </View>
          <View className="mt-4">
            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Order ID:
              </Text>
              <Text className="font-poppins-medium text-sm">
                {order?.poNumber}
              </Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Status:
              </Text>
              <View
                className={`px-2 py-1 rounded-full ${order?.status === "RECEIVED" ? "bg-green-100" : "bg-red-100"}`}
              >
                <Text
                  className={`text-green-800 text-xs font-poppins-medium ${order?.status === "RECEIVED" ? "text-green-800" : "text-red-800"}`}
                >
                  {order?.status}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Order Date:
              </Text>
              <Text className="font-poppins-medium text-sm">
                {moment(order?.createdAt).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Placed By:
              </Text>
              <Text className="font-poppins-medium text-sm">
                {order?.createdBy?.name}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Approved By:
              </Text>
              <Text className="font-poppins-medium text-sm">
                {order?.approvedBy?.name}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Supplier:
              </Text>
              <Text className="font-poppins-medium text-sm">
                {order?.supplier?.name}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-poppins-light text-sm text-gray-600">
                Supplier Phone:
              </Text>
              <Text className="font-poppins-medium text-sm">
                {order?.supplier?.phone}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-poppins-light text-sm text-gray-600">
                Location:
              </Text>
              <Text className="font-poppins-medium text-sm">
                {order?.deliveryLocation?.name}
              </Text>
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-lg font-poppins-medium text-tomato-600 mb-3">
              Order Items
            </Text>
            <View className="flex-row bg-base-color p-2 rounded-t-lg">
              <Text className="flex-1 font-poppins-medium text-sm text-white">
                Item
              </Text>
              <Text className="w-20 font-poppins-medium text-sm text-white text-right">
                Price
              </Text>
              <Text className="w-12 font-poppins-medium text-sm text-white text-center">
                Qty
              </Text>
              <Text className="w-20 font-poppins-medium text-sm text-white text-right">
                Total
              </Text>
            </View>
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
                    {currency + item?.unitPrice}
                  </Text>
                  <Text className="w-12 text-center font-poppins-light text-sm">
                    {item?.quantity}
                  </Text>
                  <Text className="w-20 text-right font-poppins-light text-sm">
                    {currency + item?.total}
                  </Text>
                </View>
              ))}
            </View>
          </View>
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
                {currency}
                {order?.discount ? order?.discount : 0}
              </Text>
            </View>

            <View className="flex-row justify-between py-2 border-t border-gray-200 mt-2">
              <Text className="font-poppins-medium text-sm text-base-color">
                Total:
              </Text>
              <Text className="font-poppins-medium text-lg text-tomato-600">
                {currency + order?.total.toLocaleString()}
              </Text>
            </View>
          </View>
          <View className="mt-4 border border-gray-300 rounded-lg p-4">
            <Text className="font-poppins-bold text-md font-bold text-gray-900 mb-2">
              Other Details
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
