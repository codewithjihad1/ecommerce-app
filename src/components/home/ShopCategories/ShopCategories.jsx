import { View, FlatList } from 'react-native';
import React from 'react';
import watchImg from '../../../../assets/shopCategoriesImage/watch.png';
import CategoryCard from './CategoryCard';
import ShopCategoriesHeader from './ShopCategoriesHeader';
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
      <ShopCategoriesHeader headerName={'Categories'}></ShopCategoriesHeader>

      <View className="mt-4">
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ gap: 10, margin: 7 }}
          renderItem={({ item, index }) => (
            <CategoryCard category={item} index={index} />
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default ShopCategories;
