import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync() {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permission for push notifications not granted");
      return null;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    console.log("Expo Push Token:", tokenData.data);

    return tokenData.data;
  } catch (error) {
    console.error("Error registering for notifications:", error);
    return null;
  }
}
