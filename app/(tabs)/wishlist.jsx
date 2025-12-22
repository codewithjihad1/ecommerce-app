import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
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
import wishlistImageFour from "../../assets/recentlyViewProduct/recently_viewedFour.webp";
import wishlistImageTwo from "../../assets/recentlyViewProduct/recently_viewedOne.webp";
import wishlistImageOne from "../../assets/recentlyViewProduct/recently_viewedThree.webp";
import wishlistImageThree from "../../assets/recentlyViewProduct/recently_viewedTwo.webp";
import { wishlistProducts } from "../../assets/wishlistProductsData/data";
import { useSanityProducts } from "../../src/components/hooks/useSanityProducts";

const wishlistImage = [
    wishlistImageFour,
    wishlistImageOne,
    wishlistImageOne,
    wishlistImageOne,
    wishlistImageOne,
    wishlistImageOne,
    wishlistImageThree,
    wishlistImageTwo,
];

export default function Wishlist() {
    const [data, setData] = useState([]);
    const router = useRouter();
    const scrollAreaRef = useRef(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

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

    // this is just for testing sanity products fetching

    const { products } = useSanityProducts();
    console.log("Sanity Products in Wishlist:", products);
    console.log("santi data");

    useEffect(() => {
        setData(wishlistProducts);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Fallback for empty wishlist */}
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
                            {data.length} item{data.length !== 1 ? "s" : ""}{" "}
                            saved
                        </Text>
                    </View>

                    {/* Recently Viewed Section */}
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
                                activeOpacity={0.7}
                            >
                                <Ionicons
                                    name="arrow-forward"
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Recently Viewed Images */}
                        <FlatList
                            data={wishlistImage}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 20 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="mr-4 items-center"
                                    activeOpacity={0.8}
                                >
                                    <View className="border-3 rounded-full border-blue-100 bg-white p-1 shadow-sm">
                                        <Image
                                            source={item}
                                            className="h-20 w-20 rounded-full"
                                            resizeMode="cover"
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                    {/* Wishlist Products */}
                    <View className="mt-4">
                        {data.map((product, index) => (
                            <TouchableOpacity
                                key={index}
                                className="mb-4 flex-row rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                                activeOpacity={0.9}
                            >
                                {/* Product Image */}
                                <View className="mr-4">
                                    <Image
                                        source={product.img}
                                        className="h-44 w-44 rounded-2xl"
                                        resizeMode="contain"
                                    />
                                </View>

                                {/* Product Details */}
                                <View className="flex-1 justify-between py-1">
                                    <View>
                                        <Text
                                            className="mb-1 text-base font-semibold text-gray-900"
                                            numberOfLines={2}
                                            style={{ fontFamily: "Raleway" }}
                                        >
                                            {product.description}
                                        </Text>
                                        {/* color and size  */}
                                        <View className="mt-3 flex-row items-center">
                                            <Text className="mr-3 rounded bg-gray-200 px-3 py-2 text-sm text-black">
                                                Size: {product.size}
                                            </Text>
                                            <Text className="rounded bg-gray-200 px-3 py-2 text-sm text-black">
                                                Color: {product.color}
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="flex-row items-center justify-between">
                                        <Text
                                            className="text-2xl font-bold text-blue-600"
                                            style={{ fontFamily: "Raleway" }}
                                        >
                                            ${product.price}
                                        </Text>

                                        <View className="flex-row gap-2">
                                            <TouchableOpacity
                                                className="rounded-full bg-gray-100 p-2"
                                                activeOpacity={0.7}
                                            >
                                                <Ionicons
                                                    name="trash-outline"
                                                    size={18}
                                                    color="#ef4444"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                className="rounded-full bg-blue-600 px-4 py-2"
                                                activeOpacity={0.7}
                                            >
                                                <Text className="text-sm font-semibold text-white">
                                                    Add to Cart
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Bottom Spacing */}
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
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
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
