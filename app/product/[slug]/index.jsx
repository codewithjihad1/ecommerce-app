import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSanityProducts } from "../../../src/components/hooks/useSanityProducts";

export default function ProductListBySlug() {
    const { slug, from } = useLocalSearchParams();
    const router = useRouter();
    const { products } = useSanityProducts();
    const normalizedSlug = slug?.toLowerCase();

    // data fetch from sanity

    const handleGoBack = () => {
        if (from) router.replace(from);
        else if (router.canGoBack()) router.back();
        else router.replace("/");
    };

    const filteredProducts = products.filter((product) => {
        if (["features", "new", "top","recommended"].includes(normalizedSlug)) {
            return product.tags?.some(
                (tag) => tag.toLowerCase() === normalizedSlug,
            );
        }

        return product.subcategoryName?.toLowerCase() === normalizedSlug;
    });

    return (
        <SafeAreaView>
            {/* Back */}
            <View className="mx-5 my-3 ">
                <TouchableOpacity onPress={handleGoBack} className="flex-row items-center">
                    <MaterialIcons
                        className="rounded-full bg-gray-200 p-2"
                        name="keyboard-arrow-left"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            {/* Title */}
            <Text className="text-center text-2xl font-bold capitalize">
                {normalizedSlug} products
            </Text>

            {/* Products */}
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View className="flex-row flex-wrap gap-4">
                    {filteredProducts.map((product) => (
                        <View key={product._id} className="w-[130px]">
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: "/product/[slug]/[id]",
                                        params: {
                                            slug: product.subcategoryName,
                                            id: product._id,
                                            from: `product/${slug}`,
                                        },
                                    })
                                }
                            >
                                <Image
                                    source={{ uri: product.image }}
                                    className="h-[150px] w-[110px]"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>

                            <Text numberOfLines={2}>{product.title}</Text>
                            <Text className="font-semibold">
                                ${product.price}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
