import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { productsData } from '../../../../assets/data/products';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MostPopular() {
  const [products, setProducts] = useState([]);
  const staticCategory = 'mostpopular';
  const router = useRouter();
  //fetching data
  useEffect(() => {
    setProducts(
      productsData.filter(
        (p) => p.category.toLowerCase() === staticCategory.toLowerCase()
      )
    );
  }, [products.category]);

  return (
    <View className="mt-5 bg-[#FFFFFF]">
      <View className="flex-row items-center justify-between ">
        <Text className="text-2xl" style={{ fontFamily: 'RalewayBold' }}>
          Most Popular
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/product/mostpopular`,
              params: { from: 'profile' },
            })
          }
          className="flex-row items-center gap-4"
        >
          <Text className="text-xl font-semibold">See all</Text>
          <Ionicons
            className="bg-[#004CFF] p-2 rounded-full"
            name="arrow-forward"
            size={18}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <View className='mt-4'>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity className="p-2 rounded-lg shadow-sm bg-[#FFFFFF] mx-2 my-2">
              <Image
                source={item.img}
                className="w-[130px] h-[130px] rounded-lg"
                resizeMode="cover"
              />
              <View className="flex-row items-center gap-1 mt-1">
                <Text style={{ fontFamily: 'RalewayBold' }}>
                  {item.totalProducts}
                </Text>
                <AntDesign name="heart" size={20} color="#0042E0" />
                {/* <Text className="bg-blue-700 px-3 py-1 text-white">{item.category}</Text> */}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
