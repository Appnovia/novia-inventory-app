import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  getItem: (key: string) => SecureStore.getItemAsync(key),
  deleteItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const setItem = (key: string, value: string) =>
  AsyncStorage.setItem(key, value);
export const getItem = (key: string) => AsyncStorage.getItem(key);
export const deleteItem = (key: string) => AsyncStorage.removeItem(key);
