import { View, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Slide from './Slide';
import banner1 from '../../../../assets/shopCategoriesImage/Big-Sale-Banner.png';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');
const banners = [banner1, banner1, banner1, banner1];

const Dot = ({ index, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const dotWidth = interpolate(
      scrollX.value,
      inputRange,
      [8, 20, 8],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );

    return {
      width: dotWidth,
      opacity,
    };
  });

  return (
    <Animated.View
      className="h-2 rounded-full bg-[#004CFF] mx-1"
      style={animatedStyle}
    />
  );
};

const ShopSlider = () => {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        currentIndex.current = (currentIndex.current + 1) % banners.length;

        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="mt-10">
      <Animated.FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <Slide slide={item} index={index} scrollX={scrollX} />
        )}
        keyExtractor={(item, index) => index.toString()}
        // onScrollToIndexFailed={() => {}}
      />

      {/* Pagination Dots */}
      <View className="flex-row justify-center items-center mt-4">
        {banners.map((_, index) => (
          <Dot key={index} index={index} scrollX={scrollX} />
        ))}
      </View>
    </View>
  );
};

export default ShopSlider;
