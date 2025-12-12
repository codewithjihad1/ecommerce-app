import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { productsData } from "../../../../assets/data/products";

export default function MostPopular() {
  const [products, setProducts] = useState([]);
  const staticCategory = "mostpopular";
  const router = useRouter();
  //fetching data
  useEffect(() => {
    setProducts(productsData.filter((p) => p.category.toLowerCase() === staticCategory.toLowerCase()));
  }, [products.category]);

  return (
    <View className="mt-5">
      <View className="flex-row items-center justify-between ">
        <Text className="text-2xl" style={{ fontFamily: "RalewayBold" }}>
          Most Popular
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/product/mostpopular`,
              params: { from: "profile" },
            })
          }
          className="flex-row items-center gap-4">
          <Text className="text-xl font-semibold">See all</Text>
          <Ionicons className="bg-blue-700 px-2 py-2 rounded-full" name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginRight: 10 }} className="w-[140px]  rounded-md">
            <Image source={item.img} className="w-[130px] h-[150px]" resizeMode="contain" />
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "RalewayBold" }}>{item.totalProducts} items </Text>
              {/* <Text className="bg-blue-700 px-3 py-1 text-white">{item.category}</Text> */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
