import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addRecentlyViewedProduct } from "../../../store/slices/recentlyViewedProductSlice";
import { useSanityProducts } from "../../hooks/useSanityProducts";

export default function FeaturesProduct() {
    const { categoryName } = useSelector((state) => state.categoryName);
    const router = useRouter();
    const dispatch = useDispatch();

    const { products, loading } = useSanityProducts({
        category: categoryName,
        tag: "features",
        limit: 10,
    });

    const addRecentlyViewed = (product) => {
        dispatch(addRecentlyViewedProduct(product));
    };

    return (
        <View className="my-5 bg-white">
            {/* Header - Always visible */}
            <View className="flex-row items-center justify-between">
                <Text
                    className="text-2xl font-bold"
                    style={{ fontFamily: "RalewayBold" }}
                >
                    Features Products
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: `/product/features`,
                            params: { from: "/" },
                        })
                    }
                    className="flex-row items-center gap-x-3"
                >
                    <Text className="text-lg font-bold">See All</Text>
                    <Ionicons
                        className="rounded-full bg-[#004CFF] p-2"
                        name="arrow-forward"
                        size={18}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            {/* Loading State */}
            {loading ? (
                <View className="mt-4 h-64 items-center justify-center">
                    <ActivityIndicator size="large" color="004CFF" />
                    <Text className="mt-3 text-gray-500">
                        Loading products...
                    </Text>
                </View>
            ) : (
                /* Product list */
                <FlatList
                    data={products}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-4"
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        const slug = item.subcategoryName?.toLowerCase();

                        return (
                            <TouchableOpacity
                                className="mr-4 w-48 rounded-2xl border border-gray-300 bg-white p-4"
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
                                <Image
                                    source={{ uri: item.image }}
                                    className="h-40 w-full rounded-2xl"
                                    resizeMode="contain"
                                />

                                <Text
                                    className="mt-2 text-base font-semibold text-gray-900"
                                    numberOfLines={2}
                                    style={{ fontFamily: "Raleway" }}
                                >
                                    {item.title}
                                </Text>

                                <Text
                                    className="mt-1 text-lg font-bold text-blue-600"
                                    style={{ fontFamily: "Raleway" }}
                                >
                                    ${item.price}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </View>
    );
}
