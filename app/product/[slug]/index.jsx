import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSanityProducts } from "../../../src/components/hooks/useSanityProducts";

export default function ProductListBySlug() {
    const { slug, from } = useLocalSearchParams();
    const router = useRouter();
    const { products } = useSanityProducts();

    // Safety check for slug
    const normalizedSlug = slug ? slug.toLowerCase() : "";

    const handleGoBack = () => {
        if (from) router.replace(from);
        else if (router.canGoBack()) router.back();
        else router.replace("/");
    };

    const filteredProducts = products.filter((product) => {
        if (
            ["features", "new", "top", "recommended"].includes(normalizedSlug)
        ) {
            return product.tags?.some(
                (tag) => tag.toLowerCase() === normalizedSlug,
            );
        }
        return product.subcategoryName?.toLowerCase() === normalizedSlug;
    });

    // Individual Product Card Component
    const renderProduct = ({ item }) => (
        <View className="flex-1 p-2">
            <TouchableOpacity
                className="rounded-2xl bg-white p-3 shadow-sm"
                onPress={() =>
                    router.push({
                        pathname: "/product/[slug]/[id]",
                        params: {
                            slug: item.subcategoryName,
                            id: item._id,
                            from: `product/${slug}`,
                        },
                    })
                }
            >
                <View className="items-center">
                    <Image
                        source={{ uri: item.image }}
                        className="h-40 w-full"
                        resizeMode="contain"
                    />
                </View>

                <View className="mt-3">
                    <Text
                        numberOfLines={2}
                        className="text-sm font-medium text-gray-800"
                    >
                        {item.title}
                    </Text>
                    <Text className="mt-1 text-lg font-bold text-black">
                        ${item.price}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header Section */}
            <View className="flex-row items-center justify-between px-5 py-3">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="rounded-full bg-white p-2 shadow-sm"
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>

                <Text className="text-xl font-bold capitalize text-gray-900">
                    {normalizedSlug}
                </Text>

                {/* Empty view to balance the header centering */}
                <View className="w-10" />
            </View>

            {/* Responsive Grid Section */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item._id}
                renderItem={renderProduct}
                numColumns={2} // This creates the responsive 2-column layout
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="mt-20 items-center">
                        <Text className="text-gray-400">
                            No products found.
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
