import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSanityProducts } from "../../../src/components/hooks/useSanityProducts";

export default function ReviewsPage() {
    const { products } = useSanityProducts();
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

    // get reviews for current product id
    const productReviews = useMemo(() => {
        return (
            products.find((item) => String(item._id) === String(id))?.reviews ||
            []
        );
    }, [products, id]);

    const renderItem = ({ item }) => (
        <View className="mb-4 py-4">
            <View className="mb-2 flex-row items-center">
                <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <MaterialIcons name="person" size={18} color="#555" />
                </View>
                <Text
                    className="text-xl text-gray-800"
                    style={{ fontFamily: "RalewayBold" }}
                >
                    {item.author}
                </Text>
                <Text className="ml-3 text-gray-600">⭐ {item.rating}</Text>
            </View>
            <Text className="text-lg leading-6 text-gray-600">
                {item.comment}
            </Text>
            <Text className="mt-1 text-sm text-gray-400">
                {new Date(item.createdAt).toLocaleDateString()}
            </Text>
        </View>
    );

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

            {/* Title */}
            <View className="mx-5 my-5">
                <Text
                    className="text-3xl text-gray-900"
                    style={{ fontFamily: "RalewayBold" }}
                >
                    Reviews
                </Text>
                <Text className="mt-1 text-gray-500">
                    {productReviews.length} customer reviews
                </Text>
            </View>

            {/* Reviews List */}
            <FlatList
                data={productReviews}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 30,
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="mt-20 items-center">
                        <Text className="text-gray-500">No reviews found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
