import { View, Text, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const FlashProductCard = ({ product }) => {
  return (
    <View className="w-1/2 mt-4 relative">
      <View className="shadow-md bg-[#FFFFFF] mb-2 relative rounded-lg">
        <Image
          className="w-[180px] h-[180px] border-[6px] border-white rounded-lg"
          source={product.src}
        ></Image>

        <View className="absolute right-1.5 top-1.5"></View>
      </View>

      <View className="mt-1">
        <Text>{product.description}</Text>
        <View className="flex-row items-end gap-x-1">
          <Text className="font-bold text-xl mt-1">${product.rePrice}</Text>
          <Text
            className="text-lg text-[#F1AEAE]"
            style={{ textDecorationLine: 'line-through' }}
          >
            ${product.price}
          </Text>
        </View>
      </View>

      <View className="absolute right-2.5 top-1.5">
        <LinearGradient
          colors={['#F91949', '#FE528A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 6 }}
        >
          <Text className="text-white text-xs font-bold px-1.5 py-1">-{product.discount}%</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default FlashProductCard;
