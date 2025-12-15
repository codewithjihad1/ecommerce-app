import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import bagImg from '../../../../assets/shopCategoriesImage/bag.png';

const yourProducts = [
  {
    id: 1,
    src: bagImg,
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 17,
  },
  {
    id: 2,
    src: bagImg,
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 17,
  },
  {
    id: 3,
    src: bagImg,
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 17,
  },
  {
    id: 4,
    src: bagImg,
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 17,
  },
  {
    id: 5,
    src: bagImg,
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 17,
  },
  {
    id: 6,
    src: bagImg,
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 17,
  },
];

const JustForYou = () => {
  return (
    <View className="mt-6 bg-[#FFFFFF]">
      <View className="flex-row gap-2">
        <Text
          className="text-2xl font-bold"
          style={{ fontFamily: 'RalewayBold' }}
        >
          Just For You
        </Text>

        <AntDesign name="star" size={18} color="#0042E0" />
      </View>

      <View className="mt-4">
        <FlatList
          data={yourProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ gap: 5 }}
          renderItem={({ item }) => (
            <View className='w-[180px] mt-2'>
              <View className="shadow-md bg-[#FFFFFF] mb-1 relative rounded-lg">
                <Image
                  className="w-[180px] h-[180px] border-[6px] border-white rounded-lg"
                  source={item.src}
                ></Image>

                <View className="absolute right-1.5 top-1.5"></View>
              </View>

              <View className='mt-1'>
                <Text>
                    {item.description}
                </Text>
                <Text className='font-bold text-xl mt-1'>
                    ${item.price}
                </Text>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default JustForYou;
