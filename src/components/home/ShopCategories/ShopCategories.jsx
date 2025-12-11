import { View, Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import watchImg from '../../../../assets/watch.png';
import CategoryCard from './CategoryCard';
const categories = [
  {
    id: 1,
    name: 'Watch',
    img1: watchImg,
    img2: watchImg,
    img3: watchImg,
    img4: watchImg,
    count: 234,
  },
  {
    id: 2,
    name: 'Bags',
    img1: watchImg,
    img2: watchImg,
    img3: watchImg,
    img4: watchImg,
    count: 204,
  },
  {
    id: 3,
    name: 'Clothing',
    img1: watchImg,
    img2: watchImg,
    img3: watchImg,
    img4: watchImg,
    count: 134,
  },
  {
    id: 4,
    name: 'Shoes',
    img1: watchImg,
    img2: watchImg,
    img3: watchImg,
    img4: watchImg,
    count: 239,
  },
];

const ShopCategories = () => {
  return (
    <View className="mt-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Categories</Text>

        <View className="flex-row gap-x-3 items-center">
          <Text className="text-lg font-bold">See All</Text>
          <Pressable className="bg-[#004CFF] p-2 rounded-full">
            <AntDesign name="arrow-right" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      <View className="mt-4">
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ gap: 18 }}
          renderItem={({ item }) => <CategoryCard category={item} />}
        ></FlatList>
      </View>
    </View>
  );
};

export default ShopCategories;
