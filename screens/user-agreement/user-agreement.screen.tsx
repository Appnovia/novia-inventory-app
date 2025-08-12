import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Text } from "@/components/text";
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function UserAgreementScreen() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <View className="flex-1 w-[92%] mx-auto">
        <ScrollView
          className="w-full flex-1 pt-[4%]"
          showsVerticalScrollIndicator={false}>
          <View className="flex gap-y-3">
            <Text className="text-2xl text-[#05030D] font-poppins">Terms of service</Text>
            <Text className=" text-[#3E3B54] font-poppins-medium text-lg">To continue, please accept our terms of service</Text>
          </View>
          <View className="flex-col mt-5">
            <Text className="text-[#3E3B54] font-poppins-regular text-[15px]">Sample: If you're not old enough to manage your own Google Account, you need permission from your parent or legal guardian to use one. We ask that your parent or legal guardian read these terms with you.{"\n"}
              If you're a parent or legal guardian and you give permission for your child to use our services, then these terms apply to you. You're responsible for your child's activity on our services.{"\n"}
              Please note that some Google services may have additional age requirements outlined in their service-specific additional terms and policies.</Text>
          </View>
          <View className="flex-row items-center mt-11 gap-5 mb-32">
            <Checkbox
              checked={checked}
              onCheckedChange={setChecked}
            />
            <Text className="text-[#3E3B54] font-poppins-regular text-[15px]">I agree with all terms of service</Text>
          </View>
          <Button className="rounded-xl font-poppins-medium">Agree</Button>
        </ScrollView>
      </View>
    </View>
  )
}