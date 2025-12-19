import { View, Text, Image } from 'react-native';
import React from 'react';
import drawerImg from '../../../../assets/HomeImage/navigation.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const ShopHeader = () => {
  return (
    <View>
      <View className="flex-row justify-between items-center gap-x-6">
        <Image source={drawerImg} />

        <Text className="text-2xl" style={{ fontFamily: 'RalewayBold' }}>
          Gemstore
        </Text>

        <Ionicons name="notifications-outline" size={24} color="black" />

        <Text className="bg-red-600 rounded-full p-1 w-1 h-1 absolute right-1 top-1.5"></Text>
      </View>

      <View className="mt-6 flex-row justify-between">
        <View className='flex-col items-center gap-1'>
          <View className="border-[1px] border-[#004CFF] rounded-full p-0.5">
            <View className="border-[1px] p-4 rounded-full bg-[#004CFF]">
              <AntDesign name="woman" size={24} color="white" />
            </View>
          </View>
          <Text>Woman</Text>
        </View>

        <View className='flex-col items-center gap-1'>
          <View className="border-[1px] border-[#004CFF] rounded-full p-0.5">
            <View className="border-[1px] p-4 rounded-full bg-[#004CFF]">
              <AntDesign name="man" size={24} color="white" />
            </View>
          </View>
          <Text>Man</Text>
        </View>

        <View className='flex-col items-center gap-1'>
          <View className="border-[1px] border-[#004CFF] rounded-full p-0.5">
            <View className="border-[1px] p-4 rounded-full bg-[#004CFF]">
              <FontAwesome5 name="glasses" size={24} color="white" />
            </View>
          </View>
          <Text>Accessories</Text>
        </View>

        <View className='flex-col items-center gap-1'>
          <View className="border-[1px] border-[#004CFF] rounded-full p-0.5">
            <View className="border-[1px] p-4 rounded-full bg-[#004CFF]">
              <AntDesign name="woman" size={24} color="white" />
            </View>
          </View>
          <Text>Woman</Text>
        </View>
      </View>
    </View>
  );
};

export default ShopHeader;
