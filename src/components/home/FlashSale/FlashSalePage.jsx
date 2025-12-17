import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import b1Img from '../../../../assets/flashSaleImage/bubble-01.png';
import b2Img from '../../../../assets/flashSaleImage/bubble-02.png';
import bagImg from '../../../../assets/shopCategoriesImage/bag.png';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import filterImg from '../../../../assets/flashSaleImage/Filter-Icon.png';
import FlashProductCard from './FlashProductCard';

const discountCategory = ['All', '10', '20', '30', '40', '50'];

const flashProducts = [
  {
    id: 1,
    src: bagImg,
    discount: '20',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: '16',
    rePrice: '10',
  },
  {
    id: 2,
    src: bagImg,
    discount: '40',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: '16',
    rePrice: '10',
  },
  {
    id: 3,
    src: bagImg,
    discount: '10',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: '16',
    rePrice: '10',
  },
  {
    id: 4,
    src: bagImg,
    discount: '30',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: '16',
    rePrice: '10',
  },
  {
    id: 5,
    src: bagImg,
    discount: '50',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: '16',
    rePrice: '10',
  },
  {
    id: 6,
    src: bagImg,
    discount: '20',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: '16',
    rePrice: '10',
  },
];

const FlashSalePage = () => {
  const [discountSelect, setDiscountSelect] = useState(0);
  const [products, setProducts] = useState(flashProducts);
  const router = useRouter();

  const handleDiscountSelect = (idx) => {
    setDiscountSelect(idx);

    const discount = discountCategory[idx];
    if (discount === 'All') {
      return setProducts(flashProducts);
    }

    const newProducts = flashProducts.filter((p) => p.discount === discount);
    setProducts(newProducts);
  };

  // console.log(products.length);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View className="px-5 pt-4 pb-16 relative">
      <View className="mt-2">
        <TouchableOpacity
          onPress={handleGoBack}
          className="flex-row items-center"
        >
          <Ionicons
            className="bg-[#F9F9F9] p-2 rounded-full"
            name="arrow-back"
            size={24}
            color="#004CFF"
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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

        <View className="mt-10 rounded-xl bg-[#F9F9F9] flex-row justify-between">
          {discountCategory.map((d, i) => (
            <Pressable
              key={i}
              className={`p-2 ${i === discountSelect && 'bg-[#FFFFFF] border-2 border-[#004CFF] rounded-xl px-3'}`}
              onPress={() => handleDiscountSelect(i)}
            >
              <Text
                className={`text-xl font-semibold ${i === discountSelect && 'text-[#004CFF] text-2xl'}`}
              >
                {d}%
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-10">
          <View className="flex-row justify-between">
            <Text className="font-semibold text-2xl">
              {discountCategory[discountSelect]}
              {discountSelect === 0 ? '' : '%'} Discount
            </Text>
            <TouchableOpacity>
              <Image
                className="w-8 h-8"
                resizeMode="contain"
                source={filterImg}
              ></Image>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap">
            {products.map((product, i) => (
              <FlashProductCard key={i} product={product}></FlashProductCard>
            ))}
          </View>
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
