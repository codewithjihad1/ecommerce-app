import React from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import bagImg from '../../../../assets/shopCategoriesImage/bag.png';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const flashProducts = [
  { id: 1, src: bagImg, discount: '20' },
  { id: 2, src: bagImg, discount: '40' },
  { id: 3, src: bagImg, discount: '10' },
  { id: 4, src: bagImg, discount: '30' },
  { id: 5, src: bagImg, discount: '50' },
  { id: 6, src: bagImg, discount: '20' },
];

const FlashSale = () => {
  const router = useRouter();

  return (
    <View className="mt-4 bg-[#FFFFFF]">
      <View className="flex-row justify-between items-center">
        <Pressable
          onPress={() => {
            router.push({
              pathname: '/flashSale',
            });
          }}
        >
          <Text
            className="text-2xl font-bold"
            style={{ fontFamily: 'RalewayBold' }}
          >
            Flash Sale
          </Text>
        </Pressable>

        <View className="flex-row gap-x-3 items-center">
          <MaterialIcons name="access-alarm" size={24} color="#004CFF" />

          <View className="bg-[#F3F3F3] p-1">
            <Text>00</Text>
          </View>
          <View className="bg-[#F3F3F3] p-1">
            <Text>36</Text>
          </View>
          <View className="bg-[#F3F3F3] p-1">
            <Text>51</Text>
          </View>
        </View>
      </View>

      <View className="mt-4">
        <FlatList
          data={flashProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ gap: 5 }}
          renderItem={({ item }) => (
            <View className="shadow-md rounded-lg bg-[#FFFFFF] mb-1 relative">
              <Image
                className="w-[120px] h-[130px] border-[6px] border-white rounded-lg"
                source={item.src}
              ></Image>

              <View className="absolute right-1.5 top-1.5">
                <LinearGradient
                  colors={['#F91949', '#FE528A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 6 }}
                >
                  <Text className="text-white text-xs font-bold px-1.5 py-1">
                    -20%
                  </Text>
                </LinearGradient>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default FlashSale;
