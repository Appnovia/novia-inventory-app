import type { AxiosError, AxiosInstance } from "axios";
import APIRoutes from "./routes";

export async function getDashboard(axiosInstance: AxiosInstance, orgId: any) {
  try {
    const result = await axiosInstance.get(
      APIRoutes.GetDashboard.replace(":orgId", orgId)
    );
    return result.data;
  } catch (error: unknown) {
    throw new Error((error as AxiosError).message);
  }
}

export async function getSalesOrders(
  axiosInstance: AxiosInstance,
  orgId: any,
  search: string = "",
  page: number = 0,
  take: number = 10
) {
  try {
    const result = await axiosInstance.get(APIRoutes.GetSalesOrders, {
      params: {
        orgId,
        search: search || undefined,
        take,
        skip: page * take,
      },
    });

    // Determine if there's more data based on returned length
    const salesOrders = result.data.salesOrders || [];
    const hasMore = salesOrders.length === take;

    return { salesOrders, hasMore };
  } catch (error: unknown) {
    const err = error as AxiosError;
    throw new Error(err.message);
  }
}

export async function getSalesOrderById(
  axiosInstance: AxiosInstance,
  id: string
) {
  try {
    const result = await axiosInstance.get(
      APIRoutes.GetSalesOrdersById.replace(":id", id)
    );
    return result.data;
  } catch (error: unknown) {
    throw new Error((error as AxiosError).message);
  }
}

export async function getPurchaseOrders(
  axiosInstance: AxiosInstance,
  orgId: any,
  search: string = "",
  page: number = 0,
  take: number = 10
) {
  try {
    const result = await axiosInstance.get(APIRoutes.GetPurchaseOrders, {
      params: {
        orgId,
        search: search || undefined,
        take,
        skip: page * take,
      },
    });

    // Determine if there's more data based on returned length
    const purchaseOrders = result.data.purchaseOrders || [];
    const hasMore = purchaseOrders.length === take;

    return { purchaseOrders, hasMore };
  } catch (error: unknown) {
    const err = error as AxiosError;
    throw new Error(err.message);
  }
}

export async function getPurchaseOrderById(
  axiosInstance: AxiosInstance,
  id: string
) {
  try {
    const result = await axiosInstance.get(
      APIRoutes.GetPurchaseOrdersById.replace(":id", id)
    );
    return result.data;
  } catch (error: unknown) {
    throw new Error((error as AxiosError).message);
  }
}

export async function getInventory(
  axiosInstance: AxiosInstance,
  orgId: any,
  search: string = "",
  page: number = 0,
  take: number = 10
) {
  try {
    const result = await axiosInstance.get(APIRoutes.GetInventory, {
      params: {
        orgId,
        name: search || undefined,
        take,
        skip: page * take,
      },
    });

    const items = result.data.items || [];
    const hasMore = items.length === take;

    return { items, hasMore };
  } catch (error: unknown) {
    const err = error as AxiosError;
    throw new Error(err.message);
  }
}

export async function getLowStockItems(
  axiosInstance: AxiosInstance,
  orgId: any,
  search: string = "",
  page: number = 0,
  take: number = 10,
  stock: number = 10
) {
  try {
    const result = await axiosInstance.get(APIRoutes.GetLowStockItems, {
      params: {
        orgId,
        name: search || undefined,
        take,
        skip: page * take,
        stock,
      },
    });

    // Determine if there's more data based on returned length
    const items = result.data.items || [];
    const hasMore = items.length === take;

    return { items, hasMore };
  } catch (error: unknown) {
    const err = error as AxiosError;
    throw new Error(err.message);
  }
}

export async function getInventoryById(
  axiosInstance: AxiosInstance,
  id: string
) {
  try {
    const result = await axiosInstance.get(
      APIRoutes.GetInventoryById.replace(":id", id)
    );
    return result.data;
  } catch (error: unknown) {
    throw new Error((error as AxiosError).message);
  }
}
