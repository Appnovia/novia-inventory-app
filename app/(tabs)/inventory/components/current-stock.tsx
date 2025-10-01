import { useAuth } from "@/hooks/auth";
import useAxios from "@/hooks/useAxios";
import { getInventory } from "@/services/api/dashboard";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Search from "@/components/search";

const CurrentStock = () => {
  const [search, setSearch] = React.useState("");
  const { session } = useAuth();
  const orgId = session?.user?.orgId;
  const axios = useAxios();
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["inventory", orgId, search],
    queryFn: ({ pageParam = 0 }) =>
      getInventory(axios, orgId, search, pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  const inventory = data?.pages.flatMap((page: any) => page.items) || [];

  const getStockData = (item: any) => {
    let totalStock = 0;

    item?.inventories?.forEach((inventory: any) => {
      totalStock += inventory.quantity || 0;
    });

    return {
      stock: totalStock,
    };
  };

  const handleItemPress = (item: any) => {
    router.push({ pathname: "/(routes)/inventory", params: { id: item.id } });
  };

  const renderItem = ({ item }: any) => {
    const stockData = getStockData(item);
    return (
      <TouchableOpacity
        className="bg-white p-4 mb-2 rounded-lg border border-gray-300"
        onPress={() => handleItemPress(item)}
      >
        <Text className="font-poppins-bold text-md text-gray-900">
          {item.name}
        </Text>
        <Text className="font-poppins-regular text-sm text-gray-600">
          SKU: {item.sku}
        </Text>
        <Text className="font-poppins-light text-sm text-base-color">
          Total Available Stock: {stockData.stock}
        </Text>
      </TouchableOpacity>
    );
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <Search value={search} onChange={setSearch} onSubmit={refetch} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#FF6347" className="mt-10" />
      ) : (
        <FlatList
          data={inventory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          className="flex-1"
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" className="my-4" />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default CurrentStock;
