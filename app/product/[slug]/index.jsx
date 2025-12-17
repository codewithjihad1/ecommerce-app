import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { productsData } from "../../../assets/data/products";
export default function DynamicProductPage() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { from } = useSearchParams();
  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleGoBack = () => {
    if (from) {
      router.replace(`/${from}`);
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const filterProducts = products.filter((product) => product.category.toLowerCase() === slug.toLowerCase());

  return (
    <SafeAreaView>
      <View className="mx-5">
        <TouchableOpacity onPress={handleGoBack} className="flex-row items-center">
          <MaterialIcons className="bg-gray-300 p-2 rounded-full" name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {slug === "new" && (
        <View>
          <Text style={{ fontFamily: "RalewayBold" }} className="text-2xl text-center">
            New Products
          </Text>
          <View className="flex-row gap-3 mx-5 my-5">
            {filterProducts.map((newProduct, index) => (
              <View key={index} className="w-[130px]">
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/product/[slug]/[id]",
                      params: {
                        slug,
                        id: newProduct.id,
                        from: `product/${slug}`,
                      },
                    })
                  }>
                  <Image
                    source={newProduct.img}
                    alt="newProduct-image"
                    className="w-[110px] h-[150px]"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-gray-700">{newProduct.title}</Text>
                <Text className="font-semibold">{newProduct.price} $</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {slug === "mostpopular" && (
        <View>
          <Text style={{ fontFamily: "RalewayBold" }} className="text-2xl text-center">
            Most Popular Products
          </Text>
          <View className="flex-row gap-3 mx-5 my-5">
            {filterProducts.map((popularProduct, index) => (
              <View key={index} className="w-[130px]">
                <TouchableOpacity onPress={() => router.push(`/product/${slug}/${popularProduct.id}`)}>
                  <Image
                    source={popularProduct.img}
                    alt="popularProduct-image"
                    className="w-[110px] h-[150px]"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-gray-700">{popularProduct.title}</Text>
                <Text className="font-semibold">{popularProduct.price} $</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
