import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { recentlyViewedProducts } from "../../../../assets/recentlyViewProduct/Data";


export default function RecentlyViewProduct() {
  const [products, setProducts] = useState([]);

  // fetch data
  useEffect(() => {
    setProducts(recentlyViewedProducts);
  }, []);
  return (
    <View className="my-5">
      <Text style={{ fontFamily: "RalewayBold" }} className="text-2xl mb-3 ">
        Recently Viewed
      </Text>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginRight: 10 }}>
            <View className="border-3 border-blue-100 rounded-full p-1 bg-white shadow-sm">
              <Image source={item.img} className="w-20 h-20 rounded-full" resizeMode="cover" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
