import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <View className="flex-1 rounded-xl p-2 bg-[#FFFFFF] shadow-md">
      <TouchableOpacity>
        <View className="flex-row flex-wrap gap-2">
          <Image
            source={category.img1}
            className="w-[45%] h-20 rounded-md"
            resizeMode="cover"
          ></Image>
          <Image
            source={category.img2}
            className="w-[45%] h-20 rounded-md"
            resizeMode="cover"
          />
          <Image
            source={category.img3}
            className="w-[45%] h-20 rounded-md"
            resizeMode="cover"
          />
          <Image
            source={category.img4}
            className="w-[45%] h-20 rounded-md"
            resizeMode="cover"
          />
        </View>

        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-center font-bold mt-2">{category.name}</Text>
          <View className="bg-[#dfe9ff] px-2 py-1 rounded-lg">
            <Text className="text-sm">{category.count} items</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryCard;
