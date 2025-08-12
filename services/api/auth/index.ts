import type { AxiosError, AxiosInstance } from "axios";
import APIRoutes from './routes';

export async function loginUser(
  axiosInstance: AxiosInstance, 
  credentials: loginData
) {
  try {
    const data = {
      email: credentials.email,
      password: credentials.password
    }
    const result = await axiosInstance.post(APIRoutes.LoginUser, data);
    return result.data;
  } catch(error: unknown) {
    throw new Error((error as AxiosError).message)
  }
}

export async function registerUser(
    axiosInstance: AxiosInstance,
    credentials: signUpData
) {
  try {
    const result = await axiosInstance.post(APIRoutes.RegisterUser, credentials);
    return result.data;
  } catch (error: any) {
    throw new Error((error as AxiosError).message)
  }
}

export async function validateOTP(
  axiosInstance: AxiosInstance,
  otpData: { userId: string; otp: string }
) {
  try {
    const result = await axiosInstance.post(APIRoutes.ValidateOTP, otpData);
    return result.data;
  } catch (error: unknown) {
    throw new Error((error as AxiosError).message);
  }
}

export async function sendOTP(axiosInstance: AxiosInstance, email: string) {
  try {
    const result = await axiosInstance.post(
      APIRoutes.SendOTP.replace(":email", email)
    );
    return result.data;
  } catch (error: unknown) {
    throw new Error((error as AxiosError).message);
  }
}


export async function resetPassword(
  axiosInstance: AxiosInstance,
  resetPasswordData: any
) {
  try {
    const data = {
      email: resetPasswordData.email,
      token: resetPasswordData.token,
      newPassword: resetPasswordData.password,
    };
    const result = await axiosInstance.post(APIRoutes.ResetPassword, data);
    return result.data;
  } catch (error: unknown) {
    throw new Error((error as AxiosError).message);
  }
}