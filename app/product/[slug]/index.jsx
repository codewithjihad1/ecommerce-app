import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSanityProducts } from "../../../src/components/hooks/useSanityProducts";

export default function ProductListBySlug() {
    const { slug, from } = useLocalSearchParams();
    const router = useRouter();

    // Pagination settings
    const PRODUCTS_PER_PAGE = 6;
    const [limit, setLimit] = useState(PRODUCTS_PER_PAGE);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const normalizedSlug = slug ? slug.toLowerCase() : "";

    // Fetch data from Sanity
    const { products, loading } = useSanityProducts({
        tag: normalizedSlug,
        limit: limit,
    });

    // Check if we've reached the end after products load
    useEffect(() => {
        if (!loading && !loadingMore) {
            // If we got fewer products than requested, we've reached the end
            if (products.length < limit && products.length > 0) {
                setHasReachedEnd(true);
            }
        }
    }, [products.length, limit, loading, loadingMore]);

    const handleGoBack = () => {
        if (from) router.replace(from);
        else if (router.canGoBack()) router.back();
        else router.replace("/");
    };

    const handleLoadMore = () => {
        if (loadingMore || hasReachedEnd) return;

        setLoadingMore(true);

        // Simulate network delay for smooth UX
        setTimeout(() => {
            setLimit((prev) => prev + PRODUCTS_PER_PAGE);
            setLoadingMore(false);
        }, 300);
    };
    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        );
    }
    // Calculate if there are more products to load
    const hasMoreProducts = !hasReachedEnd;

    // Footer logic matching RecentlyViewed exactly
    const renderFooter = () => {
        if (products.length === 0 && !loading) return null;

        return (
            <View className="mb-10 items-center">
                {/* Load More Button */}
                {hasMoreProducts && (
                    <>
                        {loadingMore ? (
                            <ActivityIndicator size="large" color="#000" />
                        ) : (
                            <TouchableOpacity
                                onPress={handleLoadMore}
                                className="rounded-lg bg-black px-8 py-3"
                                activeOpacity={0.7}
                            >
                                <Text className="text-base font-semibold text-white">
                                    Load More
                                </Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}

                {/* End Message */}
                {!hasMoreProducts && products.length > 0 && (
                    <Text className="text-center text-gray-500">
                        You&apos;ve reached the end
                    </Text>
                )}
            </View>
        );
    };

    const renderProduct = ({ item }) => (
        <View className="mb-10 w-[48%]">
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                    router.push({
                        pathname: "/product/[slug]/[id]",
                        params: {
                            slug: item.subcategoryName || "product",
                            id: item._id,
                            from: `product/${slug}`,
                        },
                    })
                }
            >
                <View className="items-center rounded-2xl bg-gray-50 p-2">
                    <Image
                        source={{ uri: item.image }}
                        className="h-[180px] w-full"
                        resizeMode="contain"
                    />
                </View>
                <Text
                    className="mt-2 text-base font-medium text-gray-800"
                    numberOfLines={2}
                >
                    {item.title}
                </Text>
                <Text className="text-2xl font-bold text-black">
                    ${item.price}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="mx-5 py-2">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="h-10 w-10 items-center justify-center"
                >
                    <MaterialIcons
                        className="rounded-full bg-gray-300 p-2"
                        name="keyboard-arrow-left"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={renderProduct}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                }}
                ListHeaderComponent={
                    <Text
                        className="mx-5 mb-8 mt-4 text-center text-3xl capitalize"
                        style={{ fontFamily: "RalewayBold" }}
                    >
                        {normalizedSlug}
                    </Text>
                }
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    !loading && (
                        <View className="mt-20 items-center">
                            <Text className="text-gray-400">
                                No products found.
                            </Text>
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
}
