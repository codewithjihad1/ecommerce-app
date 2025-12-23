import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addRecentlyViewedProduct } from "../../../store/slices/recentlyViewedProductSlice";
import { useSanityProducts } from "../../hooks/useSanityProducts";
/**
 *
 * @export
 * @return {}
 */
export default function NewItems() {
    const { products } = useSanityProducts();
    const dispatch = useDispatch();
    const { categoryName } = useSelector((state) => state.categoryName);

    const filterNewProducts = products.filter(
        (product) =>
            product.tags?.includes("new") &&
            product.categoryName?.toLowerCase() === categoryName,
    );

    // console.log(filterNewProducts.length);

    const router = useRouter();
    const addRecentlyViewed = (product) => {
        dispatch(
            addRecentlyViewedProduct(product),
        );
    };
    return (
        <View className="mb-5 mt-5">
            <View className="flex-row items-center justify-between">
                <Text
                    className="text-2xl font-bold"
                    style={{ fontFamily: "RalewayBold" }}
                >
                    New Products
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: `/product/new`,
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

            <FlatList
                data={filterNewProducts}
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
        </View>
    );
}
