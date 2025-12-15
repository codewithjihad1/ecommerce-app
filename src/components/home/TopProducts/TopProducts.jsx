// import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image } from 'react-native';
import bagImg from '../../../../assets/shopCategoriesImage/bag.png';
import watchImg from '../../../../assets/shopCategoriesImage/watch.png';

const topProducts = [bagImg, watchImg, bagImg, watchImg, bagImg];

const TopProducts = () => {
  return (
    <View className="bg-[#FFFFFF] my-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Top Products</Text>
      </View>
      <View className="flex-row mt-4 gap-4">
        {topProducts.map((product, index) => (
          <View key={index} className="shadow-md">
            <Image
              className="w-[60px] h-[60px] rounded-full border-[4px] border-white"
              resizeMode="cover"
              source={product}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default TopProducts;
