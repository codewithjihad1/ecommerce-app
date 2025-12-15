import { SafeAreaView } from 'react-native-safe-area-context';
import ShopHeader from '../../src/components/home/ShopHeader/ShopHeader';
import ShopSlider from '../../src/components/home/ShopSlider/ShopSlider';
import ShopCategories from '../../src/components/home/ShopCategories/ShopCategories';
import TopProducts from '../../src/components/home/TopProducts/TopProducts';
import { FlatList, View } from 'react-native';
import NewItems from '../../src/components/profile/newitem/NewProducts';
import FlashSale from '../../src/components/home/FlashSale/FlashSale';

export default function HomeScreen() {
  const sections = [{ id: 'main' }];

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1">
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 8,
        }}
        renderItem={() => (
          <View>
            <ShopHeader />
            <ShopSlider />
            <ShopCategories />
            <TopProducts />
            <NewItems />
            <FlashSale />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
