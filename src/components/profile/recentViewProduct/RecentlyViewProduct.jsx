import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import product from "../../../../assets/recentlyViewProduct/kurta.png";
const recentlyViewedProduct = [
  {
    title: "ProductOne",
    img: product,
  },
  {
    title: "ProductOne",
    img: product,
  },
  {
    title: "ProductOne",
    img: product,
  },
  {
    title: "ProductOne",
    img: product,
  },
  {
    title: "ProductOne",
    img: product,
  },
  {
    title: "ProductOne",
    img: product,
  },
];

export default function RecentlyViewProduct() {
  return (
    <View className='my-5'>
      <Text style={{fontFamily:'RalewayBold'}} className='text-2xl mb-3 '>Recently Viewed</Text>
      <FlatList
        data={recentlyViewedProduct}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Image source={item.img} className="rounded-full border-4 border-gray-50 px-5 w-[100px] h-[100px]" resizeMode="contain" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
