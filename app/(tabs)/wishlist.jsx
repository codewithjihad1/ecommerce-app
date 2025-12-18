import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import wishlistImageFour from "../../assets/recentlyViewProduct/recently_viewedFour.webp";
import wishlistImageTwo from "../../assets/recentlyViewProduct/recently_viewedOne.webp";
import wishlistImageOne from "../../assets/recentlyViewProduct/recently_viewedThree.webp";
import wishlistImageThree from "../../assets/recentlyViewProduct/recently_viewedTwo.webp";
import { wishlistProducts } from "../../assets/wishlistProductsData/data";
import { useSanityProducts } from "../../src/components/hooks/useSanityProducts";

const wishlistImage = [
  wishlistImageFour,
  wishlistImageOne,
  wishlistImageOne,
  wishlistImageOne,
  wishlistImageOne,
  wishlistImageOne,
  wishlistImageThree,
  wishlistImageTwo,
];

export default function Wishlist() {
  const [data, setData] = useState([]);
  const router = useRouter();

  // this is just for testing sanity products fetching

  const {products} = useSanityProducts();
  console.log("Sanity Products in Wishlist:", products);



  useEffect(() => {
    setData(wishlistProducts);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Fallback for empty wishlist */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-6 pb-4">
          {/* Header */}
          <View className="mb-6">
            <Text style={{ fontFamily: "Raleway" }} className="text-4xl font-bold text-gray-900">
              Wishlist
            </Text>
            <Text className="text-gray-500 mt-1 text-base">
              {data.length} item{data.length !== 1 ? "s" : ""} saved
            </Text>
          </View>

          {/* Recently Viewed Section */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-3xl font-semibold text-gray-900" style={{ fontFamily: "Raleway" }}>
                Recently viewed
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/product/recentlyviewedproduct",
                    params: { from: "wishlist" },
                  })
                }
                className="bg-blue-600 p-2 rounded-full"
                activeOpacity={0.7}>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Recently Viewed Images */}
            <FlatList
              data={wishlistImage}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity className="mr-4 items-center" activeOpacity={0.8}>
                  <View className="border-3 border-blue-100 rounded-full p-1 bg-white shadow-sm">
                    <Image source={item} className="w-20 h-20 rounded-full" resizeMode="cover" />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          {/* Wishlist Products */}
          <View className="mt-4">
            {data.map((product, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row bg-white rounded-2xl mb-4 p-4 shadow-sm border border-gray-100"
                activeOpacity={0.9}>
                {/* Product Image */}
                <View className="mr-4">
                  <Image source={product.img} className="w-44 h-44 rounded-2xl" resizeMode="contain" />
                </View>

                {/* Product Details */}
                <View className="flex-1 justify-between py-1">
                  <View>
                    <Text
                      className="text-base font-semibold text-gray-900 mb-1"
                      numberOfLines={2}
                      style={{ fontFamily: "Raleway" }}>
                      {product.description}
                    </Text>
                    {/* color and size  */}
                    <View className="flex-row items-center mt-3">
                      <Text className="text-sm bg-gray-200 text-black px-3 py-2 mr-3 rounded">Size: {product.size}</Text>
                      <Text className="text-sm bg-gray-200 text-black px-3 py-2 rounded">Color: {product.color}</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-bold text-blue-600" style={{ fontFamily: "Raleway" }}>
                      ${product.price}
                    </Text>

                    <View className="flex-row gap-2">
                      <TouchableOpacity className="bg-gray-100 p-2 rounded-full" activeOpacity={0.7}>
                        <Ionicons name="trash-outline" size={18} color="#ef4444" />
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-full" activeOpacity={0.7}>
                        <Text className="text-white font-semibold text-sm">Add to Cart</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
