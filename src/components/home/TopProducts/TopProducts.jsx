import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

const TopProducts = () => {
  return (
    <View className="flex-row justify-between items-center mt-4">
      <Text className="text-2xl font-bold">Top Products</Text>

      <View className="flex-row gap-x-3 items-center">
        <Text className="text-lg font-bold">See All</Text>
        <Pressable className="bg-[#004CFF] p-2 rounded-full">
          <AntDesign name="arrow-right" size={18} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default TopProducts;
