import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatDistanceToNow } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useSanityProducts } from "../../../../src/components/hooks/useSanityProducts";
import { addToCart } from "../../../../src/store/slices/cartSlice";
export default function ProductDescription() {
    const { id, from } = useLocalSearchParams();
    const { products, loading } = useSanityProducts();
    const router = useRouter();
    const dispatch = useDispatch();
    // add to cart is managed by redux
    // selected options
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
    // state for the description accordion
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
    // state for reviews section
    const [showAllReviews, setShowAllReviews] = useState(true);

    // handler function for description accordion
    const handleToggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };
// product page updated
    // handler function for reviews section
    const handleToggleReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

    const handleAddToCart = () => {
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

    // filter product by id
    const product = products.find((p) => p._id === id);

    const handleGoBack = () => {
        if (from) {
            router.replace(`/${from}`);
        } else if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/");
        }
    };
    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-white">
                <Text className="text-2xl font-bold">Loading...</Text>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-white">
                <Text className="text-2xl font-bold">Product not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Back button */}
            <View className="mx-5 mt-3">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="flex-row items-center"
                >
                    <MaterialIcons
                        className="rounded-full bg-gray-200 p-2"
                        name="keyboard-arrow-left"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image */}
                <View className="w-full bg-white">
                    <Image
                        source={{ uri: product.image }}
                        className="h-[400px] w-full"
                        resizeMode="contain"
                    />
                </View>

                {/* Details */}
                <View className="rounded-t-[30px] border border-gray-300 p-6">
                    {/* Title & Price */}
                    <View className="mb-4 border-b border-gray-300">
                        <View className="flex-row items-center justify-between">
                            <Text
                                style={{ fontFamily: "RalewayBold" }}
                                className="mb-4 text-2xl font-bold text-gray-900"
                            >
                                {product.title}
                            </Text>
                            <Text
                                style={{ fontFamily: "RalewayBold" }}
                                className="text-3xl font-bold text-[#508A7B]"
                            >
                                ${product.price}
                            </Text>
                        </View>

                        {/* Rating */}
                        <View className="mb-8 mt-3 flex-row items-center gap-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <AntDesign
                                    key={index}
                                    name="star"
                                    size={20}
                                    color="#508A7B"
                                />
                            ))}
                            <Text className="text-lg text-gray-700">(30)</Text>
                        </View>
                    </View>

                    {/* Color & Size */}
                    <View className="mb-4 flex-row justify-between border-b border-gray-300">
                        {/* Color */}
                        <View>
                            <Text
                                style={{ fontFamily: "RalewayBold" }}
                                className="mb-4"
                            >
                                Color
                            </Text>

                            <View className="mb-5 flex-row gap-3 pb-4">
                                {product.colors.map((color) => {
                                    const normalized = color
                                        .trim()
                                        .toLowerCase();
                                    const isActive = selectedColor === color;

                                    return (
                                        <TouchableOpacity
                                            key={color}
                                            onPress={() =>
                                                setSelectedColor(color)
                                            }
                                            style={{
                                                backgroundColor: normalized,
                                                width: 26,
                                                height: 26,
                                                borderRadius: 13,
                                                borderWidth: isActive ? 2 : 0,
                                                borderColor: "#000",
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        </View>

                        {/* Size */}
                        <View>
                            <Text
                                style={{ fontFamily: "RalewayBold" }}
                                className="mb-4"
                            >
                                Size
                            </Text>

                            <View className="mb-5 flex-row gap-3 pb-4">
                                {product.sizes.map((size) => {
                                    const isActive = selectedSize === size;

                                    return (
                                        <TouchableOpacity
                                            key={size}
                                            onPress={() =>
                                                setSelectedSize(size)
                                            }
                                            className={`items-center justify-center rounded-full border px-4 py-1 ${
                                                isActive
                                                    ? "border-black bg-black"
                                                    : "border-gray-400"
                                            }`}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "RalewayBold",
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
                    </View>

                    {/* Description */}
                    {product.description && (
                        <View>
                            <TouchableOpacity
                                onPress={handleToggleDescription}
                                className="mb-4 flex-row items-center justify-between border-b border-gray-300 pb-2"
                            >
                                <Text
                                    style={{ fontFamily: "RalewayBold" }}
                                    className="mb-5 text-lg font-bold text-gray-900"
                                >
                                    Description
                                </Text>
                                <MaterialIcons
                                    name="keyboard-arrow-down"
                                    size={28}
                                    color="black"
                                    className={
                                        isDescriptionExpanded
                                            ? "rotate-180"
                                            : ""
                                    }
                                />
                            </TouchableOpacity>
                            <Text className="mb-5 text-gray-700">
                                {isDescriptionExpanded
                                    ? product.description
                                    : ""}
                            </Text>
                        </View>
                    )}
                    {/* Reviews Section */}
                    <View className="mb-10">
                        <TouchableOpacity
                            onPress={handleToggleReviews}
                            className="mb-4 flex-row items-center justify-between border-b border-gray-300 pb-2"
                        >
                            <Text
                                style={{ fontFamily: "RalewayBold" }}
                                className="mb-5 text-lg font-bold text-gray-900"
                            >
                                Reviews
                            </Text>
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={28}
                                color="black"
                                className={
                                    isDescriptionExpanded ? "rotate-180" : ""
                                }
                            />
                        </TouchableOpacity>

                        {/* Reviews card */}
                        <View className="flex-row items-center justify-between">
                            <View className="flex-col gap-8">
                                { showAllReviews && product.reviews
                                    .slice(0, 2)
                                    .map((review, index) => (
                                        <View key={index}>
                                            <View className="mb-1 w-full flex-row items-center justify-between">
                                                <View className="mb-2 flex-col gap-2">
                                                    <Text
                                                        className=""
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
                                                <View>
                                                    <Text className="text-gray-400">
                                                        {formatDistanceToNow(
                                                            new Date(
                                                                review.createdAt,
                                                            ),
                                                            { addSuffix: true },
                                                        )}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Text className="font-light">
                                                {review.comment}
                                            </Text>
                                        </View>
                                    ))}
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: "/product/reviews",
                                    params: { id },
                                })
                            }
                        >
                            <Text className="mt-10 text-center text-blue-500 underline">
                                See all reviews
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Add to cart */}
                <View className="mx-5 mb-6">
                    <TouchableOpacity onPress={handleAddToCart}>
                        <Text className="rounded-lg bg-[#004CFF] py-4 text-center text-lg font-bold text-white">
                            Add to cart
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
