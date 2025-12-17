import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { recentlyViewedProducts } from "../../assets/recentlyViewProduct/Data";

const PRODUCTS_PER_PAGE = 6;

export default function RecentlyViewedProduct() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { from } = useSearchParams();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(null);

  // Date picker related
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };

  // delete picker date so that i can see initial data
  const handleDeleteDate = () => {
    setDate(null);
  };

  // products related
  useEffect(() => {
    loadInitialProducts();
  }, []);

  // How many product will load
  const loadInitialProducts = () => {
    const initial = recentlyViewedProducts.slice(0, PRODUCTS_PER_PAGE);
    setDisplayedProducts(initial);
  };

  // load more products
  const loadMoreProducts = () => {
    if (loading) return;
    const startIndex = currentPage * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    // Check if there are more products to load
    if (startIndex >= recentlyViewedProducts.length) return;
    setLoading(true);

    // Simulate network delay (remove in production if data is local)
    setTimeout(() => {
      const moreProducts = recentlyViewedProducts.slice(startIndex, endIndex);
      setDisplayedProducts((prev) => [...prev, ...moreProducts]);
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    }, 300);
  };

  const handleGoBack = () => {
    if (from) {
      router.replace(`${from}`);
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const hasMoreProducts = displayedProducts.length < recentlyViewedProducts.length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-5">
        <TouchableOpacity onPress={handleGoBack} className="flex-row items-center">
          <MaterialIcons className="bg-gray-300 p-2 rounded-full" name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView className="mx-5 py-5" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Text className="text-3xl mb-5" style={{ fontFamily: "RalewayBold" }}>
          Recently Viewed
        </Text>

        {/* Pick a date for filter the data based on date */}
        <View className="flex-row items-center justify-between ">
          <TouchableOpacity className="w-[45%]">
            <Text className="bg-blue-200 py-3 text-center text-[#004cff] font-bold rounded-full">Today</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={showDatePicker} className="w-[45%]">
            <Text className="bg-blue-200 py-3 text-center text-[#004cff] font-bold rounded-full">Pick a Date</Text>
          </TouchableOpacity>

          {/* Date picker modal  */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            display="spinner"
            textColor="black"
            themeVariant="light"
            maximumDate={new Date()}
            minimumDate={new Date(2000, 0, 1)}
          />
        </View>
        <View className="my-5">
          {date && (
            <View className="flex-row items-center gap-5">
              <Text className="text-lg">
                Product is showing visited on:{" "}
                <Text className="font-bold">{date ? date.toLocaleDateString() : "No date selected"}</Text>
              </Text>
              <TouchableOpacity onPress={() => handleDeleteDate()} className="">
                <Entypo name="cross" size={24} color="white" className="bg-red-700 px-2 " />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* Two products per row */}
        <View className="flex-row flex-wrap justify-between mt-10">
          {displayedProducts.map((product, index) => (
            <TouchableOpacity key={index} className="mb-10 w-[48%]" activeOpacity={0.7}>
              <Image source={product.img} className="w-full h-[180px]" resizeMode="contain" />
              <Text className="text-base mt-2" numberOfLines={2}>
                {product.title}
              </Text>
              <Text className="font-bold text-2xl">${product.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Load More Button */}
        {hasMoreProducts && (
          <View className="items-center mb-10">
            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <TouchableOpacity onPress={loadMoreProducts} className="bg-black px-8 py-3 rounded-lg">
                <Text className="text-white text-base font-semibold">Load More</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* End Message */}
        {!hasMoreProducts && displayedProducts.length > 0 && (
          <Text className="text-center text-gray-500 mb-10">You&apos;ve reached the end</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
