import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import b1Img from '../../../../assets/flashSaleImage/bubble-01.png';
import b2Img from '../../../../assets/flashSaleImage/bubble-02.png';

const discountCategory = ['All', '10%', '20%', '30%', '40%', '50%'];

const FlashSalePage = () => {
  const [discountSelect, setDiscountSelect] = useState(discountCategory.length);

  const handleDiscountSelect = (idx) => {
    setDiscountSelect(idx);
  };

  return (
    <View className="px-5 pt-4 pb-2 relative">
      <ScrollView>
        <View className="flex-row justify-between items-center mt-2">
          <View className="">
            <Text className="text-[30px] font-semibold">Flash Sale</Text>
          </View>

          <View className="flex-row gap-x-3 items-center">
            <MaterialIcons name="access-alarm" size={24} color="white" />

            <View className="flex-row items-center gap-x-1">
              <View className="bg-[#F3F3F3] p-1 rounded-lg">
                <Text className="text-lg">00</Text>
              </View>
              <View className="bg-[#F3F3F3] p-1 rounded-lg">
                <Text className="text-lg">36</Text>
              </View>
              <View className="bg-[#F3F3F3] p-1 rounded-lg">
                <Text className="text-lg">51</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text>Choose Your Discount</Text>
        </View>

        <View className="mt-10 flex-row justify-center">
          {discountCategory.map((d, i) => (
            <Pressable
              key={i}
              className={`bg-[#F9F9F9] p-2 rounded-lg ${i === discountSelect && 'bg-[#FFFFFF] border-2 border-[#004CFF] rounded-s-full rounded-e-full px-3'}`}
              onPress={() => handleDiscountSelect(i)}
            >
              <Text
                className={`text-xl font-semibold ${i === discountSelect && 'text-[#004CFF] scale-110'}`}
              >
                {d}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Image
        className="w-full absolute top-0 -right-20 -z-10"
        source={b1Img}
        resizeMode="contain"
      />
      <Image
        className="w-full absolute top-0 -right-8 -z-20"
        source={b2Img}
        resizeMode="contain"
      />
    </View>
  );
};

export default FlashSalePage;
