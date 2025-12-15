// import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image } from 'react-native';
import bagImg from '../../../../assets/shopCategoriesImage/bag.png';
import watchImg from '../../../../assets/shopCategoriesImage/watch.png';

const topProducts = [bagImg, watchImg, bagImg, watchImg, bagImg, watchImg];

const TopProducts = () => {
  return (
    <View className='bg-[#FFFFFF]'>
      <View className="flex-row justify-between items-center mt-4">
        <Text className="text-2xl font-bold">Top Products</Text>
      </View>
      <View className="flex-row mt-4">
        {topProducts.map((product, index) => (
          <View key={index}>
            <Image
              className="w-[45px] h-20 rounded-full"
              resizeMode="contain"
              source={product}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default TopProducts;
