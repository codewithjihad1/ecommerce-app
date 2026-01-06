import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({ product, onPress }) {
    const {
        name,
        price,
        regular_price,
        sale_price,
        on_sale,
        categories,
        images,
    } = product;

    const imageUrl =
        images?.[0]?.src ||
        "https://via.placeholder.com/300x300.png?text=No+Image";

    return (
        <TouchableOpacity
            onPress={onPress}
            className="mb-4 w-[48%] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
            {/* Image */}
            <View className="relative">
                <Image
                    source={{ uri: imageUrl }}
                    className="h-40 w-full bg-gray-100"
                    resizeMode="contain"
                />

                {on_sale && (
                    <View className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1">
                        <Text className="text-xs font-bold text-white">
                            SALE
                        </Text>
                    </View>
                )}
            </View>

            {/* Content */}
            <View className="p-3">
                {/* Category */}
                {categories?.[0] && (
                    <Text className="mb-1 text-xs text-gray-500">
                        {categories[0].name}
                    </Text>
                )}

                {/* Name */}
                <Text
                    numberOfLines={2}
                    className="mb-2 text-sm font-semibold text-gray-900"
                >
                    {name}
                </Text>

                {/* Price */}
                <View className="flex-row items-center space-x-2">
                    {on_sale ? (
                        <>
                            <Text className="text-lg font-bold text-green-600">
                                ৳{sale_price}
                            </Text>
                            <Text className="text-sm text-gray-400 line-through">
                                ৳{regular_price}
                            </Text>
                        </>
                    ) : (
                        <Text className="text-lg font-bold text-gray-900">
                            ৳{price}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}
