import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../src/store/slices/cartSlice";
import { removeItem } from "../../src/store/slices/wishlistSlice";

export default function Wishlist() {
    const router = useRouter();
    const scrollAreaRef = useRef(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const dispatch = useDispatch();
    const wishListItems = useSelector((state) => state.wishlist.items || []);
    const recentlyViewItems = useSelector(
        (state) => state.recentlyViewed.items || [],
    );
    const scrollToTop = () => {
        scrollAreaRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    };

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollTop(offsetY > 200);
    };

    const recentlyViewedImages = recentlyViewItems
        .slice(0, 10)
        .map((item) => item.image);

    const handleRemove = (id) => {
        dispatch(removeItem(id));
        console.log("Remove:", id);
    };

    const handleAddToCart = (product) => {
        dispatch(
            addToCart({
                _id: product._id,
                title: product.title,
                price: product.price,
                image: product.image,
                color: product.color,
                size: product.size,
            }),
        );
        router.push("/(tabs)/cart");
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                ref={scrollAreaRef}
            >
                <View className="px-5 pb-4 pt-6">
                    {/* Header */}
                    <View className="mb-6">
                        <Text
                            style={{ fontFamily: "Raleway" }}
                            className="text-4xl font-bold text-gray-900"
                        >
                            Wishlist
                        </Text>
                        <Text className="mt-1 text-base text-gray-500">
                            {wishListItems.length} item
                            {wishListItems.length !== 1 ? "s" : ""} saved
                        </Text>
                    </View>

                    {/* Recently Viewed */}
                    {recentlyViewedImages.length > 0 && (
                        <View className="mb-6">
                            <View className="mb-4 flex-row items-center justify-between">
                                <Text
                                    className="text-3xl font-semibold text-gray-900"
                                    style={{ fontFamily: "Raleway" }}
                                >
                                    Recently viewed
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname:
                                                "/product/recentlyviewedproduct",
                                            params: { from: "wishlist" },
                                        })
                                    }
                                    className="rounded-full bg-blue-600 p-2"
                                >
                                    <Ionicons
                                        name="arrow-forward"
                                        size={20}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={recentlyViewItems}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingRight: 20 }}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => {
                                    const slug =
                                        item.subcategoryName?.toLowerCase();
                                    return (
                                        <TouchableOpacity
                                            onPress={() =>
                                                router.push({
                                                    pathname:
                                                        "/product/[slug]/[id]",
                                                    params: {
                                                        slug,
                                                        id: item._id,
                                                    },
                                                })
                                            }
                                            className="mr-4 items-center"
                                        >
                                            <View className="border-3 rounded-full border-blue-100 bg-white p-1 shadow-sm">
                                                <Image
                                                    source={{ uri: item.image }}
                                                    className="h-20 w-20 rounded-full"
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    )}

                    {/* Wishlist Products */}
                    <View className="mt-4">
                        {wishListItems.length === 0 ? (
                            <Text className="text-center text-gray-500">
                                Your wishlist is empty
                            </Text>
                        ) : (
                            wishListItems.map((product, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        const slug =
                                            product.subcategoryName?.toLowerCase();
                                        router.push({
                                            pathname: "/product/[slug]/[id]",
                                            params: {
                                                slug,
                                                id: product._id,
                                            },
                                        });
                                    }}
                                    className="mb-4 flex-row rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                                >
                                    {/* Product Image */}
                                    <View className="mr-4">
                                        <Image
                                            source={{ uri: product.image }}
                                            className="h-44 w-44 rounded-2xl"
                                            resizeMode="contain"
                                        />
                                    </View>

                                    {/* Product Details */}
                                    <View className="flex-1 gap-5 py-1">
                                        <View>
                                            <Text
                                                className="mb-1 text-base font-semibold text-gray-900"
                                                numberOfLines={2}
                                                style={{
                                                    fontFamily: "Raleway",
                                                }}
                                            >
                                                {product.title}
                                            </Text>

                                            <View className="mt-3 flex-row items-center">
                                                <Text className="mr-3 rounded bg-gray-200 px-3 py-2 text-sm text-black">
                                                    Size: {product.sizes?.[0]}
                                                </Text>
                                                <Text className="rounded bg-gray-200 px-3 py-2 text-sm text-black">
                                                    Color: {product.colors?.[0]}
                                                </Text>
                                            </View>
                                        </View>

                                        <View className="flex-row items-center justify-between">
                                            <Text
                                                className="text-2xl font-bold text-blue-600"
                                                style={{
                                                    fontFamily: "Raleway",
                                                }}
                                            >
                                                ${product.price}
                                            </Text>

                                            <View className="flex-row gap-2">
                                                <TouchableOpacity
                                                    className="rounded-full bg-gray-100 p-2"
                                                    onPress={() =>
                                                        handleRemove(
                                                            product._id,
                                                        )
                                                    }
                                                >
                                                    <Ionicons
                                                        name="trash-outline"
                                                        size={18}
                                                        color="#ef4444"
                                                    />
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    className="rounded-full bg-blue-600 px-4 py-2"
                                                    onPress={() =>
                                                        handleAddToCart(product)
                                                    }
                                                >
                                                    <Text className="text-sm font-semibold text-white">
                                                        Add to Cart
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </View>

                <View className="h-8" />
            </ScrollView>

            {showScrollTop && (
                <View
                    style={{
                        position: "absolute",
                        bottom: 90,
                        right: 20,
                    }}
                >
                    <Pressable
                        onPress={scrollToTop}
                        style={{
                            backgroundColor: "#004CFF",
                            width: 56,
                            height: 56,
                            borderRadius: 28,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 8,
                        }}
                    >
                        <Ionicons name="arrow-up" size={28} color="white" />
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
    );
}
