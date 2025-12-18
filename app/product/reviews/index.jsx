import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Reviews } from "../../../assets/reviewsData/Reviews";

export default function ReviewsPage() {
  const [reviewsData, setReviewsData] = useState([]);
  const router = useRouter();
  const { from } = useSearchParams();
  const { id } = useLocalSearchParams();

  const handleGoBack = () => {
    if (from) {
      router.replace(`${from}`);
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  useEffect(() => {
    setReviewsData(Reviews);
  }, []);

  // get reviews for current product id
  const productReviews = useMemo(() => {
    return reviewsData.find((item) => String(item.id) === String(id))?.reviews || [];
  }, [reviewsData, id]);

  const renderItem = ({ item }) => (
    <View className="py-4 mb-4 ">
      <View className="flex-row items-center mb-2">
        <View className="h-8 w-8 rounded-full bg-gray-200 items-center justify-center mr-3">
          <MaterialIcons name="person" size={18} color="#555" />
        </View>
        <Text className="text-xl text-gray-800" style={{ fontFamily: "RalewayBold" }}>
          {item.author}
        </Text>
      </View>
      <Text className="text-gray-600 leading-6 text-lg">{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="mx-5 mt-2 flex-row items-center">
        <TouchableOpacity onPress={handleGoBack} className="flex-row items-center">
          <MaterialIcons className="bg-gray-300 p-2 rounded-full" name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View className="mx-5 my-5">
        <Text className="text-3xl text-gray-900" style={{ fontFamily: "RalewayBold" }}>
          Reviews
        </Text>
        <Text className="text-gray-500 mt-1">{productReviews.length} customer reviews</Text>
      </View>

      {/* Reviews List */}
      <FlatList
        data={productReviews}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center mt-20">
            <Text className="text-gray-500">No reviews found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
