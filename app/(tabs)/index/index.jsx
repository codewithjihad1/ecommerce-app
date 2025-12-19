import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import ShopHeader from '../../src/components/home/ShopHeader/ShopHeader';
import ShopSlider from '../../../src/components/home/ShopSlider/ShopSlider';
import ShopCategories from '../../../src/components/home/ShopCategories/ShopCategories';
import TopProducts from '../../../src/components/home/TopProducts/TopProducts';
import { FlatList, View, Pressable } from 'react-native';
import NewItems from '../../../src/components/profile/newitem/NewProducts';
import FlashSale from '../../../src/components/home/FlashSale/FlashSale';
import MostPopular from '../../../src/components/profile/mostpopular/MostPopular';
import JustForYou from '../../../src/components/home/JustForYou/JustForYou';
import { Ionicons } from '@expo/vector-icons';
import ShopHeader from '../../../src/components/home/ShopHeader2/ShopHeader2';

export default function HomeScreen() {
  const sections = [{ id: 'main' }];
  const flatListRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 400);
  };

  return (
    <SafeAreaView className="bg-[#FFFFFF] flex-1">
      <FlatList
        ref={flatListRef}
        data={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 8,
        }}
        renderItem={() => (
          <View>
            {/* <ShopHeader /> */}
            <ShopHeader />
            <ShopSlider />
            <ShopCategories />
            <TopProducts />
            <NewItems />
            <FlashSale />
            <MostPopular />
            <JustForYou />
          </View>
        )}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            right: 20,
          }}
        >
          <Pressable
            onPress={scrollToTop}
            style={{
              backgroundColor: '#004CFF',
              width: 56,
              height: 56,
              borderRadius: 28,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 8,
            }}
          >
            <Ionicons name="arrow-up" size={28} color="white" />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
