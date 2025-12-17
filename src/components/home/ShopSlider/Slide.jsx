import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
// import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('screen');

const Slide = ({ slide, index, scrollX }) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.5, 1, 0.5],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.5, 1, 0.5],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  //   console.log(slide);
  return (
    <Animated.View
      className="justify-center items-center gap-x-5"
      style={[{ width }, rnAnimatedStyle]}
    >
      <View className="w-full rounded-lg overflow-hidden">
        <Image source={slide} className="w-full h-[150px]" resizeMode="cover" />
      </View>
      {/* <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        // style={styles.background}
      ></LinearGradient> */}
    </Animated.View>
  );
};

export default Slide;

// const styles = StyleSheet.create({
//   background: {
//     position: 'absolute',
//     right: 0,
//     left: 0,
//     top: 0,
//     height: 150,
//     marginTop: 8,
//     marginBottom: 10
//   },
// });
