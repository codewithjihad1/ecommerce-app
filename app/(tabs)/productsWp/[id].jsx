import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetailsPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useLocalSearchParams();
    console.log("product", product, "id", id);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/products/${id}`,
                );
                if (res) setProduct(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        Alert.alert(
            "Added to Cart",
            `${quantity} × ${product.name} added to your cart`,
        );
    };

    const handleShare = () => {
        Alert.alert("Share", "Share this product with friends");
    };

    const incrementQuantity = () => setQuantity((q) => q + 1);
    const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    if (isLoading)
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} color="blue" />
            </SafeAreaView>
        );

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="flex-1 bg-white">
                {/* Header */}
                <View className="flex-row items-center justify-between bg-gray-50 px-4 py-4">
                    <Text className="text-lg font-semibold text-gray-800">
                        Product Details
                    </Text>
                    <TouchableOpacity onPress={handleShare} className="p-2">
                        <FontAwesome name="share" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Product Image */}
                <View className="h-80 w-full items-center justify-center bg-gray-100">
                    <Image
                        source={{ uri: product.images[0].src }}
                        className="h-full w-full"
                        resizeMode="contain"
                    />
                </View>

                {/* Product Info Container */}
                <View className="px-4 py-6">
                    {/* Name and Favorite */}
                    <View className="mb-4 flex-row items-start justify-between">
                        <View className="flex-1 pr-4">
                            <Text className="mb-2 text-2xl font-bold text-gray-900">
                                {product.name}
                            </Text>
                            <Text className="mb-3 text-sm text-gray-500">
                                {product.category}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsFavorite(!isFavorite)}
                            className={`rounded-full p-2 ${isFavorite ? "bg-red-100" : "bg-gray-100"}`}
                        >
                            <FontAwesome
                                name="heart"
                                size={24}
                                color={isFavorite ? "#ef4444" : "#999"}
                                fill={isFavorite ? "#ef4444" : "none"}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Rating */}
                    <View className="mb-6 flex-row items-center">
                        <View className="flex-row">
                            {[...Array(5)].map((_, i) => (
                                <FontAwesome
                                    name="star"
                                    key={i}
                                    size={16}
                                    color={
                                        i < parseInt(product.rating)
                                            ? "#fbbf24"
                                            : "#e5e7eb"
                                    }
                                    fill={
                                        i < parseInt(product.rating)
                                            ? "#fbbf24"
                                            : "none"
                                    }
                                />
                            ))}
                        </View>
                        <Text className="ml-3 text-sm text-gray-600">
                            {product.ratingCount} reviews
                        </Text>
                    </View>

                    {/* Price */}
                    <View className="mb-6 rounded-lg bg-blue-50 p-4">
                        <Text className="mb-1 text-sm text-gray-600">
                            Price
                        </Text>
                        <Text className="text-3xl font-bold text-blue-600">
                            {product.currency} {product.price}
                        </Text>
                    </View>

                    {/* Stock Status */}
                    <View className="mb-6 flex-row items-center">
                        <View className="mr-2 h-3 w-3 rounded-full bg-green-500" />
                        <Text className="text-sm font-medium text-gray-700">
                            In Stock
                        </Text>
                    </View>

                    {/* Short Description */}
                    <View className="mb-6">
                        <Text className="text-sm leading-5 text-gray-600">
                            {product.shortDescription}
                        </Text>
                    </View>

                    {/* Full Description */}
                    <View className="mb-6 rounded-lg bg-gray-50 p-4">
                        <Text className="mb-2 text-xs font-semibold uppercase text-gray-700">
                            Description
                        </Text>
                        <Text className="text-sm leading-5 text-gray-600">
                            {product.description}
                        </Text>
                    </View>

                    {/* SKU */}
                    <View className="mb-6 border-b border-gray-200 pb-6">
                        <Text className="mb-1 text-xs font-semibold uppercase text-gray-700">
                            SKU
                        </Text>
                        <Text className="text-sm text-gray-600">
                            {product.sku}
                        </Text>
                    </View>

                    {/* Quantity Selector */}
                    <View className="mb-6">
                        <Text className="mb-3 text-sm font-semibold text-gray-700">
                            Quantity
                        </Text>
                        <View className="w-32 flex-row items-center rounded-lg bg-gray-100">
                            <TouchableOpacity
                                onPress={decrementQuantity}
                                className="h-10 w-10 items-center justify-center"
                            >
                                <Text className="text-lg font-bold text-gray-600">
                                    −
                                </Text>
                            </TouchableOpacity>
                            <Text className="flex-1 text-center font-semibold text-gray-800">
                                {quantity}
                            </Text>
                            <TouchableOpacity
                                onPress={incrementQuantity}
                                className="h-10 w-10 items-center justify-center"
                            >
                                <Text className="text-lg font-bold text-gray-600">
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Add to Cart Button */}
                    <TouchableOpacity
                        onPress={handleAddToCart}
                        className="mb-4 flex-row items-center justify-center rounded-lg bg-blue-600 py-4"
                    >
                        <FontAwesome
                            name="shopping-cart"
                            size={20}
                            color="white"
                            marginRight={8}
                        />
                        <Text className="text-lg font-bold text-white">
                            Add to Cart
                        </Text>
                    </TouchableOpacity>

                    {/* Buy Now Button */}
                    <TouchableOpacity className="items-center justify-center rounded-lg bg-gray-200 py-4">
                        <Text className="text-lg font-bold text-gray-800">
                            Buy Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductDetailsPage;
