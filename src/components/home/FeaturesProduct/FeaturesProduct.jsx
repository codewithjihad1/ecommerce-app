import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSanityProducts } from "../../hooks/useSanityProducts";

export default function FeaturesProduct() {
    const { products } = useSanityProducts();
    const router = useRouter();
    const filterFeaturesProducts = products.filter((product) =>
        product.tags?.includes("features"),
    );
    return (
        <View className="my-5 bg-white">
            {/* Header */}
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

            {/* Product list */}
            <FlatList
                data={filterFeaturesProducts}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-4"
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    const slug = item.subcategoryName?.toLowerCase();

                    return (
                        <TouchableOpacity
                            className="mr-4 w-48 rounded-2xl border border-gray-300 bg-white p-4"
                            onPress={() =>
                                router.push({
                                    pathname: "/product/[slug]/[id]",
                                    params: {
                                        slug,
                                        id: item._id,
                                    },
                                })
                            }
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
