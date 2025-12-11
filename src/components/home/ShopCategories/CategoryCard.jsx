import { View, Text, Image } from 'react-native';
import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <View className="flex-1 rounded-lg p-2">
      <View className="flex-row flex-wrap gap-1">
        <Image
          source={category.img1}
          className="w-[48%] h-20 rounded-md"
          resizeMode="cover"
        />
        <Image
          source={category.img2}
          className="w-[48%] h-20 rounded-md"
          resizeMode="cover"
        />
        <Image
          source={category.img3}
          className="w-[48%] h-20 rounded-md"
          resizeMode="cover"
        />
        <Image
          source={category.img4}
          className="w-[48%] h-20 rounded-md"
          resizeMode="cover"
        />
      </View>
      <Text className="text-center font-semibold mt-2">{category.name}</Text>
      <Text className="text-center text-gray-600">{category.count} items</Text>
    </View>
  );
};

export default CategoryCard;
