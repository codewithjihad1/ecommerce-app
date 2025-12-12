import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { productsData } from "../../../../assets/data/products";
/**
 *
 *
 * @export
 * @return {}
 */
export default function NewItems() {
  const [products, setNewProducts] = useState([]);
  const staticCategory = "new";

  // fetching data
  useEffect(() => {
    setNewProducts(productsData.filter((p) => p.category.toLowerCase() === staticCategory.toLowerCase()));
  }, []);
  const router = useRouter();
  return (
    <View className="mt-5 mb-5">
      <View className="flex-row items-center justify-between ">
        <Text className="text-2xl" style={{ fontFamily: "RalewayBold" }}>
          New Items
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/product/new`,
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
            <Text className="font-light my-2 text-gray-800">{item.des}</Text>
            <Text className="font-bold">{item.price} $</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
