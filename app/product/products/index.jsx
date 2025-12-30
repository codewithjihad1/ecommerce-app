import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useSanityProducts } from "../../../src/components/hooks/useSanityProducts";
import { addRecentlyViewedProduct } from "../../../src/store/slices/recentlyViewedProductSlice";

export default function Products() {
    const { type } = useLocalSearchParams();
    const { from } = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const { products } = useSanityProducts();
    const addRecentlyViewed = (product) => {
        dispatch(addRecentlyViewedProduct(product));
    };

    console.log(type);

    const handleGoBack = () => {
        if (from) {
            router.replace(`${from}`);
        } else if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/");
        }
    };

    // filter the product by product type
    const filterProductsByProductType = products.filter(
        (product) => product.producttype.toLowerCase() === type.toLowerCase(),
    );

    // console.log(filterProductsByProductType);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="mx-5 mt-2 flex-row items-center">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="flex-row items-center"
                >
                    <MaterialIcons
                        className="rounded-full bg-gray-300 p-2"
                        name="keyboard-arrow-left"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            {/* product type */}
            <View className="mx-5">
                <Text
                    className="text-center text-2xl font-bold"
                    style={{ fontFamily: "RalewayBold" }}
                >
                    {type.toUpperCase()}
                </Text>
            </View>

            <FlatList
                data={filterProductsByProductType}
                numColumns={2}
                keyExtractor={(item) => item._id}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                }}
                renderItem={({ item }) => {
                    const slug = item.subcategoryName?.toLowerCase();
                    return (
                        <TouchableOpacity
                            style={{ maxWidth: "50%" }}
                            className="m-2 flex-1 p-3"
                            onPress={() => {
                                addRecentlyViewed(item);
                                router.push({
                                    pathname: "/product/[slug]/[id]",
                                    params: {
                                        slug,
                                        id: item._id,
                                    },
                                });
                            }}
                        >
                            {/* Image Container */}
                            <View className="mb-2 h-40 w-full">
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: "100%", height: "100%" }} // Fix: Image should be 100% of the card
                                    resizeMode="contain"
                                />
                            </View>

                            <Text
                                style={{ fontFamily: "RalewayBold" }}
                                numberOfLines={1}
                                className="text-sm"
                            >
                                {item.title}
                            </Text>

                            <Text className="font-semibold text-blue-600">
                                ${item.price}
                            </Text>

                            <Text className="py-1 text-[10px] text-gray-500">
                                Sizes: {item.sizes?.join(", ")}
                            </Text>

                            {/* Colors Section */}
                            <View className="mt-1 flex-row gap-1">
                                {item.colors?.map((color, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            backgroundColor: color
                                                .trim()
                                                .toLowerCase(),
                                            width: 14,
                                            height: 14,
                                            borderRadius: 7,
                                            borderWidth: 1,
                                            borderColor: "#E5E7EB",
                                        }}
                                    />
                                ))}
                            </View>
                        </TouchableOpacity>
                    );
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
}
