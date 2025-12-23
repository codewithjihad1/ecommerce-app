import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatDistanceToNow } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useSanityProducts } from "../../../../src/components/hooks/useSanityProducts";
import { addToCart } from "../../../../src/store/slices/cartSlice";
import { addItem } from "../../../../src/store/slices/wishlistSlice";

export default function ProductDescription() {
    const { id, from } = useLocalSearchParams();

    const router = useRouter();
    const dispatch = useDispatch();
    const { products, loading } = useSanityProducts();

    const product = products.find((p) => p._id === id);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
    const [isReviewsExpanded, setIsReviewsExpanded] = useState(true);
    const [clickHeart, setClickHeart] = useState(false);

    // Set default color and size when product loads
    useEffect(() => {
        if (product) {
            setSelectedColor(product.colors?.[0] || null);
            setSelectedSize(product.sizes?.[0] || null);
        }
    }, [product]);

    const handleGoBack = () => {
        if (from) router.replace(`/${from}`);
        else if (router.canGoBack()) router.back();
        else router.replace("/");
    };

    // add to cart event handler
    const handleAddToCart = () => {
        if (!product) return;

        dispatch(
            addToCart({
                _id: product._id,
                title: product.title,
                price: product.price,
                image: product.image,
                color: selectedColor,
                size: selectedSize,
            }),
        );
        router.push("/(tabs)/cart");
    };
    const handleWishlist = () => {
        if (!product?._id) return;

        dispatch(
            addItem({
                ...product,
                color: selectedColor, 
                size: selectedSize, 
            }),
        );

        router.push("/(tabs)/wishlist");
        setClickHeart(!clickHeart);
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-white">
                <Text className="text-xl font-bold">Loading...</Text>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-white">
                <Text className="text-xl font-bold">Product not found!</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Back */}
            <View className="px-4 pt-3">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="flex-row items-center"
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={28}
                        color="black"
                        className="rounded-full bg-gray-200 p-2"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                <View>
                    {/* Image */}
                    <Image
                        source={{ uri: product.image }}
                        style={{ width: "100%", aspectRatio: 1 }}
                        resizeMode="contain"
                        className="relative"
                    />
                    {/* Wishlist icon */}
                    <TouchableOpacity
                        className="absolute right-4 top-4"
                        onPress={handleWishlist}
                    >
                        <EvilIcons
                            name="heart"
                            size={32}
                            color={clickHeart ? "red" : "black"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Details */}
                <View className="rounded-t-[30px] border border-gray-300 px-4 pt-6">
                    {/* Title & Price */}
                    <View className="mb-4 border-b border-gray-300 pb-4">
                        <View className="flex-row items-start">
                            <Text
                                numberOfLines={2}
                                style={{
                                    fontFamily: "RalewayBold",
                                    flexShrink: 1,
                                }}
                                className="flex-1 pr-3 text-xl text-gray-900"
                            >
                                {product.title}
                            </Text>

                            <Text
                                style={{ fontFamily: "RalewayBold" }}
                                className="text-2xl text-[#508A7B]"
                            >
                                ${product.price}
                            </Text>
                        </View>
                    </View>

                    {/* Color & Size (flex-row, responsive) */}
                    <View className="mb-4 flex-row flex-wrap border-b border-gray-300">
                        {/* Color */}
                        {product.colors && product.colors.length > 0 && (
                            <View className="min-w-[150px] flex-1 pr-4">
                                <Text
                                    style={{ fontFamily: "RalewayBold" }}
                                    className="mb-3"
                                >
                                    Color
                                </Text>

                                <View className="mb-4 flex-row flex-wrap gap-3">
                                    {product.colors.map((color) => {
                                        const isActive =
                                            selectedColor === color;

                                        return (
                                            <TouchableOpacity
                                                key={color}
                                                onPress={() =>
                                                    setSelectedColor(color)
                                                }
                                                style={{
                                                    backgroundColor: color
                                                        .trim()
                                                        .toLowerCase(),
                                                    width: 26,
                                                    height: 26,
                                                    borderRadius: 13,
                                                    borderWidth: isActive
                                                        ? 2
                                                        : 0,
                                                    borderColor: "#000",
                                                }}
                                            />
                                        );
                                    })}
                                </View>
                            </View>
                        )}

                        {/* Size */}
                        {product.sizes && product.sizes.length > 0 && (
                            <View className="min-w-[150px] flex-1">
                                <Text
                                    style={{ fontFamily: "RalewayBold" }}
                                    className="mb-3"
                                >
                                    Size
                                </Text>

                                <View className="mb-4 flex-row flex-wrap gap-3">
                                    {product.sizes.map((size) => {
                                        const isActive = selectedSize === size;

                                        return (
                                            <TouchableOpacity
                                                key={size}
                                                onPress={() =>
                                                    setSelectedSize(size)
                                                }
                                                className={`rounded-full border px-4 py-1 ${
                                                    isActive
                                                        ? "border-black bg-black"
                                                        : "border-gray-400"
                                                }`}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "RalewayBold",
                                                    }}
                                                    className={
                                                        isActive
                                                            ? "text-white"
                                                            : "text-black"
                                                    }
                                                >
                                                    {size}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Description Accordion */}
                    {product.description && (
                        <View className="mb-4">
                            <TouchableOpacity
                                onPress={() =>
                                    setIsDescriptionExpanded(
                                        !isDescriptionExpanded,
                                    )
                                }
                                className="flex-row items-center justify-between border-b border-gray-300 pb-2"
                            >
                                <Text
                                    style={{ fontFamily: "RalewayBold" }}
                                    className="text-lg"
                                >
                                    Description
                                </Text>
                                <MaterialIcons
                                    name="keyboard-arrow-down"
                                    size={26}
                                    style={{
                                        transform: [
                                            {
                                                rotate: isDescriptionExpanded
                                                    ? "180deg"
                                                    : "0deg",
                                            },
                                        ],
                                    }}
                                />
                            </TouchableOpacity>

                            {isDescriptionExpanded && (
                                <Text className="mt-3 text-gray-700">
                                    {product.description}
                                </Text>
                            )}
                        </View>
                    )}

                    {/* Reviews Accordion */}
                    {product.reviews && product.reviews.length > 0 && (
                        <View className="mb-6">
                            <TouchableOpacity
                                onPress={() =>
                                    setIsReviewsExpanded(!isReviewsExpanded)
                                }
                                className="flex-row items-center justify-between border-b border-gray-300 pb-2"
                            >
                                <Text
                                    style={{ fontFamily: "RalewayBold" }}
                                    className="text-lg"
                                >
                                    Reviews
                                </Text>
                                <MaterialIcons
                                    name="keyboard-arrow-down"
                                    size={26}
                                    style={{
                                        transform: [
                                            {
                                                rotate: isReviewsExpanded
                                                    ? "180deg"
                                                    : "0deg",
                                            },
                                        ],
                                    }}
                                />
                            </TouchableOpacity>

                            {isReviewsExpanded && (
                                <View className="mt-4">
                                    {product.reviews
                                        .slice(0, 2)
                                        .map((review, index) => (
                                            <View key={index} className="mb-5">
                                                <View className="flex-row items-start justify-between">
                                                    <View className="flex-1 pr-3">
                                                        <Text
                                                            numberOfLines={1}
                                                            style={{
                                                                fontFamily:
                                                                    "RalewayBold",
                                                            }}
                                                        >
                                                            {review.author}
                                                        </Text>
                                                        <Text>
                                                            ⭐ {review.rating}
                                                        </Text>
                                                    </View>

                                                    <Text className="text-gray-400">
                                                        {formatDistanceToNow(
                                                            new Date(
                                                                review.createdAt,
                                                            ),
                                                            { addSuffix: true },
                                                        )}
                                                    </Text>
                                                </View>

                                                <Text className="mt-2 text-gray-700">
                                                    {review.comment}
                                                </Text>
                                            </View>
                                        ))}

                                    <TouchableOpacity
                                        onPress={() =>
                                            router.push({
                                                pathname: "/product/reviews",
                                                params: { id },
                                            })
                                        }
                                    >
                                        <Text className="mt-4 text-center text-blue-500 underline">
                                            See all reviews
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {/* Add to Cart */}
                <View className="mt-4 px-4">
                    <TouchableOpacity
                        onPress={handleAddToCart}
                        className="rounded-lg bg-[#004CFF] py-4"
                    >
                        <Text className="text-center text-lg font-bold text-white">
                            Add to cart
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
