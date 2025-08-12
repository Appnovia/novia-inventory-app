import Header from "@/components/header";
import { Input } from "@/components/input";
import Search from "@/components/search";
import { useAuth } from "@/hooks/auth";
import { getCurrencySymbol } from "@/hooks/general";
import useAxios from "@/hooks/useAxios";
import { getPurchaseOrders } from "@/services/api/dashboard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PurchaseScreen() {
  const axios = useAxios();
  const { session } = useAuth();
  const orgId = session?.user?.orgId;
  const [search, setSearch] = React.useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["purchaseOrders", orgId, search],
    queryFn: ({ pageParam = 0 }) =>
      getPurchaseOrders(axios, orgId, search, pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  const allOrders =
    data?.pages.flatMap((page: any) => page.purchaseOrders) || [];
  //   console.log("data", allOrders);

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <View className="flex-1 w-[92%] mx-auto">
        <Header title="Purchase Orders" />
        <Search value={search} onChange={setSearch} onSubmit={refetch} />

        {isLoading ? (
          <ActivityIndicator size="large" color="#FF6347" className="mt-10" />
        ) : (
          <OrdersTable
            orders={allOrders}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            loadingMore={isFetchingNextPage}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function OrdersTable({
  orders,
  onEndReached,
  loadingMore,
}: {
  orders: any[];
  onEndReached: () => void;
  loadingMore: boolean;
}) {
  const { user } = useAuth();
  const currency = getCurrencySymbol(user?.organisation?.currency);

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(routes)/purchase",
          params: { id: item?.id },
        })
      }
      style={{
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text className="font-poppins-medium text-base text-[#333]">
          {item?.supplier?.name}
        </Text>
      </View>

      <Text className="font-poppins-light text-sm text-base-color mt-1">
        Delivery to: {item?.deliveryLocation?.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <Text className="font-poppins-bold text-[#000] text-base">
          {currency}
          {item.total.toLocaleString()}
        </Text>

        {item?.createdAt && (
          <Text className="font-poppins-light text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={{ paddingBottom: 10, paddingTop: 10 }}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#FF6347" />
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
        ListEmptyComponent={
          <Text className="font-poppins-light text-lg text-center text-base-color">
            No Record Found
          </Text>
        }
      />
    </View>
  );
}
