import Header from "@/components/header";
import { Input } from "@/components/input";
import Search from "@/components/search";
import { useAuth } from "@/hooks/auth";
import { getCurrencySymbol } from "@/hooks/general";
import useAxios from "@/hooks/useAxios";
import { getSalesOrders } from "@/services/api/dashboard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Eye, SearchIcon } from "lucide-react-native";
import moment from "moment";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SalesScreen() {
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
    queryKey: ["salesOrders", orgId, search],
    queryFn: ({ pageParam = 0 }) =>
      getSalesOrders(axios, orgId, search, pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  const allOrders = data?.pages.flatMap((page: any) => page.salesOrders) || [];
  // console.log("data", allOrders);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View style={{ flex: 1, width: "92%", alignSelf: "center" }}>
        <Header title="Sales Orders" />
        <Search value={search} onChange={setSearch} onSubmit={refetch} />

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#FF6347"
            style={{ marginTop: 40 }}
          />
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
          pathname: "/(routes)/sales",
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
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text className="font-poppins-medium text-base text-[#333]">
        {item.customer?.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <Text className="font-poppins-regular text-sm text-base-color">
          Paid: {currency}
          {item.amountPaid.toLocaleString()}
        </Text>
        <Text className="font-poppins-regular text-sm text-gray-500">
          Total: {currency}
          {item.total.toLocaleString()}
        </Text>
      </View>
      {item?.createdAt && (
        <Text className="font-poppins-light text-xs text-gray-400 mt-2">
          {moment(item.createdAt).format("DD-MM-YYYY")}
        </Text>
      )}
    </Pressable>
  );

  return (
    <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10 }}>
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
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <Text className="font-poppins-light text-lg text-center text-base-color">
            No Record Found
          </Text>
        }
      />
    </View>
  );
}
