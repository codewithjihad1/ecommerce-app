import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { productsData } from "../../../../assets/data/products";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSearchParams } from "expo-router/build/hooks";

const { width } = Dimensions.get("window");

export default function ProductDescription() {
  const { id } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const { from } = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const findSingleProduct = products.find((p) => p.id === Number(id));
  const handleGoBack = () => {
    if (from) {
      router.replace(`/${from}`);
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50 ">
      <View className="mx-5">
        <TouchableOpacity onPress={handleGoBack} className="flex-row items-center">
          <MaterialIcons className="bg-gray-300 p-2 rounded-full" name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {findSingleProduct ? (
          <View className="flex-1">
            {/* Product Image */}
            <View className="w-full bg-white rounded-b-[30px] overflow-hidden shadow-lg" style={{ height: width * 1 }}>
              <Image source={findSingleProduct.img} className="w-full h-full" resizeMode="contain" />
            </View>

            {/* Product Details */}
            <View className="p-6">
              <Text className="text-3xl font-bold text-gray-900 mb-4 leading-9">{findSingleProduct.title}</Text>
              <Text className="mb-4 text-gray-700 font-semibold">{findSingleProduct.des}</Text>
              <View className="bg-white p-5 rounded-2xl mb-6 shadow-sm">
                <Text className="text-sm text-gray-500 mb-2 font-semibold">Price</Text>
                <Text className="text-4xl font-bold text-blue-500">${findSingleProduct.price}</Text>
              </View>

              {/* Description Section */}
              {findSingleProduct.description && (
                <View className="bg-white p-5 rounded-2xl mb-6 shadow-sm">
                  <Text className="text-lg font-bold text-gray-900 mb-3">Description</Text>
                  <Text className="text-base text-gray-600 leading-6">{findSingleProduct.description}</Text>
                </View>
              )}

              {/* Additional Details */}
              <View className="flex-row gap-3">
                <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
                  <Text className="text-xs text-gray-400 mb-1.5 font-semibold">Category</Text>
                  <Text className="text-base font-bold text-gray-900">
                    {findSingleProduct.category.toUpperCase() || "General"}
                  </Text>
                </View>
                <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
                  <Text className="text-xs text-gray-400 mb-1.5 font-semibold">Stock</Text>
                  <Text className="text-base font-bold text-gray-900">In Stock</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center p-10 mt-24">
            <Text className="text-2xl font-bold text-gray-900 mb-2">Product not found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
