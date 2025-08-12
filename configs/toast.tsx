import { BaseToast, ErrorToast, ToastConfigParams } from "react-native-toast-message";

const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: '#2E7D32'
      }}
      text2Style={{
        fontSize: 14,
        color: '#4CAF50',
      }}
    />
  ),

  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#d32f2f' }}
      text1Style={{
        fontSize: 15,
        fontWeight: '600',
        color: '#d32f2f',
      }}
      text2Style={{
        fontSize: 14,
        color: '#f44336',
      }}
      text1Props={{
        numberOfLines: 2,
      }}
    />
  )
}

export default toastConfig;