import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { getInventoryById } from "@/services/api/dashboard";
import Nav from "@/components/nav";
import { useAuth } from "@/hooks/auth";
import { getCurrencySymbol } from "@/hooks/general";
import moment from "moment";

const InventoryDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const axios = useAxios();

  const { data: response, isLoading } = useQuery({
    queryKey: ["inventoryItem", id],
    queryFn: () => getInventoryById(axios, id as string),
  });

  const { session } = useAuth();
  const currency = getCurrencySymbol(
    session?.user?.organisation?.currency as string
  );

  const item = response?.item;
  const calculateStockData = () => {
    let totalStock = 0;
    let totalAvailable = 0;
    let totalReserved = 0;

    item?.inventories?.forEach((inventory: any) => {
      totalStock += inventory.quantity || 0;
      totalReserved += inventory.reservedQuantity || 0;
      totalAvailable = totalStock - totalReserved;
    });

    return {
      stock: totalStock,
      available: totalAvailable,
      reserved: totalReserved,
    };
  };

  const stockData = calculateStockData();

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <Nav title="Inventory" />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#FF6347"
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView className="bg-white p-6 rounded-lg shadow-sm">
          <View className="border-b border-gray-200 pb-4 mb-4">
            <Text className="font-poppins-bold text-xl font-bold text-gray-900">
              {item?.name}
            </Text>
            <Text className="font-poppins-regular text-base text-gray-600">
              SKU: {item?.sku}
            </Text>
            <Text className="font-poppins-regular text-base text-gray-600">
              Barcode: {item?.barcode || "N/A"}
            </Text>
            <Text className="font-poppins-regular text-base text-gray-600 mt-2">
              Description: {item?.description}
            </Text>
            <View className="flex-row justify-between mt-2">
              <Text className="font-poppins-regular text-base text-base-color">
                Cost: {currency + item?.costPrice?.toLocaleString()}
              </Text>
              <Text className="font-poppins-regular text-base text-base-color">
                Price: {currency + item?.sellingPrice?.toLocaleString()}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mb-6">
            <View className="flex-1 items-center bg-gray-100 p-3 rounded-lg mx-1">
              <Text className="font-poppins-light text-sm text-gray-600">
                Total Stock
              </Text>
              <Text className="text-2xl font-bold text-gray-900 my-1">
                {stockData.stock}
              </Text>
              <Text className="font-poppins-light text-xs text-gray-500">
                All locations
              </Text>
            </View>

            <View className="flex-1 items-center bg-gray-100 p-3 rounded-lg mx-1">
              <Text className="font-poppins-light text-sm text-gray-600">
                Available
              </Text>
              <Text className="text-2xl font-bold text-gray-900 my-1">
                {stockData.available}
              </Text>
              <Text className="font-poppins-light text-xs text-gray-500">
                Not reserved
              </Text>
            </View>

            <View className="flex-1 items-center bg-gray-100 p-3 rounded-lg mx-1">
              <Text className="font-poppins-light text-sm text-gray-600">
                Reserved
              </Text>
              <Text className="text-2xl font-bold text-gray-900 my-1">
                {stockData.reserved}
              </Text>
              <Text className="font-poppins-light text-xs text-gray-500">
                For orders
              </Text>
            </View>
          </View>

          <Text className="text-lg font-bold text-gray-900 mb-4">
            Stock by Location
          </Text>

          <View className="border border-gray-200 rounded-lg mb-4">
            <View className="flex-row bg-base-color p-3 rounded-t-lg">
              <Text className="font-poppins-bold font-bold flex-1 text-white">
                Location
              </Text>
              <Text className="font-poppins-bold font-bold flex-1 text-white text-right">
                Stock
              </Text>
              <Text className="font-poppins-bold font-bold flex-1 text-white text-right">
                Reserved
              </Text>
            </View>

            {item?.inventories?.map((inventory: any, index: number) => (
              <View
                key={inventory.id || index}
                className="flex-row p-3 border-t border-gray-200 items-center"
              >
                <Text className="flex-1 font-poppins-light text-sm text-gray-900">
                  {inventory.location?.name || `Location ${index + 1}`}
                </Text>
                <Text className="flex-1 font-poppins-light text-sm text-gray-900 text-right">
                  {inventory.quantity}
                </Text>
                <Text className="flex-1 font-poppins-light text-sm text-gray-600 text-right">
                  {inventory.reservedQuantity}
                </Text>
              </View>
            ))}
          </View>

          {/* Additional item details */}
          <View className="mt-4 border border-gray-300 rounded-lg p-4">
            <Text className="text-lg font-bold text-gray-900 mb-2">
              Product Details
            </Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Created:</Text>
              <Text className="text-gray-900">
                {moment(item?.createdAt).format("DD MMM YYYY")}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Last Updated:</Text>
              <Text className="text-gray-900">
                {moment(item?.updatedAt).format("DD MMM YYYY")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Total Sales:</Text>
              <Text className="text-gray-900">{item?.salesCount}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default InventoryDetailScreen;
