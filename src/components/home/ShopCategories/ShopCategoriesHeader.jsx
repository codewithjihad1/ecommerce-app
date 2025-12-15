import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ShopCategoriesHeader = ({ headerName }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold" style={{ fontFamily: 'RalewayBold' }}>{headerName}</Text>

        <View className="flex-row gap-x-3 items-center">
          <Text className="text-lg font-bold">See All</Text>
          <Pressable className="bg-[#004CFF] p-2 rounded-full">
            <AntDesign name="arrow-right" size={18} color="white" />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ShopCategoriesHeader;
