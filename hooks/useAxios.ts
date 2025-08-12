import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "./auth";

const useAxios = () => {
  const { session, removeSession } = useAuth();
  const token = session?.token;

  return useMemo(() => {
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not set.");
    }

    const instance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        "X-App-Version": process.env.EXPO_PUBLIC_APP_VERSION || "1.0.0",
      },
      withCredentials: true,
    });

    instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (__DEV__) {
        console.log("📤 Request:", config.method?.toUpperCase(), config.url);
      }

      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 401) {
          Toast.show({
            type: "error",
            text1: "Session Expired",
            text2: "Please log in again.",
          });
          removeSession();
        } else if (status === 428) {
          Toast.show({
            type: "error",
            text1: "Update Required",
            text2: (error.response?.data as { detail?: string })?.detail || "Please update your app.",
          });
        } else if (status && status >= 500) {
          Toast.show({
            type: "error",
            text1: "Server Error",
            text2: "Something went wrong. Try again later.",
          });
        } else if (!error.response) {
          Toast.show({
            type: "error",
            text1: "Network Error",
            text2: "Check your internet connection.",
          });
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [token]);
};

export default useAxios;
