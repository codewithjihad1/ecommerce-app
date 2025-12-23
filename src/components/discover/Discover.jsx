import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSanityProducts } from "../hooks/useSanityProducts";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const Discover = () => {
    const { products } = useSanityProducts();
    const [subCategory, setSubCategory] = useState([]);
    const [productType, setProductType] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategory, setExpandedCategory] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!products) return;

        const uniqueSubCategories = [
            ...new Set(products.map((p) => p.subcategoryName).filter(Boolean)),
        ];

        const newProductTypes = [];
        uniqueSubCategories.forEach((uc) => {
            const categoryProducts = products.filter(
                (p) => uc === p.subcategoryName,
            );
            // console.log(categoryProducts.length);

            const typeCountMap = {};
            categoryProducts.forEach((p) => {
                const type = p.producttype;
                typeCountMap[type] = (typeCountMap[type] || 0) + 1;
            });

            const typesWithCount = Object.entries(typeCountMap).map(
                ([type, count]) => ({
                    name: type,
                    count: count,
                }),
            );

            // console.log(typesWithCount);

            newProductTypes.push({
                name: uc,
                types: typesWithCount,
                count: typesWithCount.length,
            });
        });

        setProductType(newProductTypes);
        setSubCategory(uniqueSubCategories);
    }, [products]);

    const handleGoBack = () => {
        router.back();
    };

    const handleCategoryPress = (category) => {
        // Toggle: if same category clicked, close it. Otherwise, open new one
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const filteredCategories = subCategory.filter((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const getCategoryTypes = (categoryName) => {
        const categoryData = productType.find((pt) => pt.name === categoryName);
        return categoryData?.types || [];
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
                    activeOpacity={0.7}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>

                <Text className="text-3xl font-bold">Discover</Text>

                <View className="w-10" />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Search Bar */}
                <View className="mx-5 mt-2">
                    <View className="relative">
                        <Ionicons
                            name="search"
                            size={20}
                            color="#9CA3AF"
                            style={{
                                position: "absolute",
                                left: 16,
                                top: 14,
                                zIndex: 1,
                            }}
                        />
                        <TextInput
                            className="rounded-2xl bg-gray-100 py-3.5 pl-12 pr-4 text-base"
                            placeholder="Search subcategories..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setSearchQuery("")}
                                className="absolute right-4 top-3.5"
                            >
                                <Ionicons
                                    name="close-circle"
                                    size={20}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Category Count */}
                <View className="mx-5 mt-6">
                    <Text className="text-sm text-gray-500">
                        {filteredCategories.length}{" "}
                        {filteredCategories.length === 1
                            ? "category"
                            : "categories"}{" "}
                        found
                    </Text>
                </View>

                {/* Subcategory Cards */}
                <View className="mx-5 mt-4">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, index) => {
                            const isExpanded = expandedCategory === category;
                            const types = getCategoryTypes(category);

                            return (
                                <View key={index} className="mb-4">
                                    <Pressable
                                        onPress={() =>
                                            handleCategoryPress(category)
                                        }
                                        className="overflow-hidden rounded-2xl"
                                    >
                                        {({ pressed }) => (
                                            <LinearGradient
                                                colors={["#667eea", "#764ba2"]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                className={`overflow-hidden rounded-2xl ${pressed ? "opacity-90" : "opacity-100"}`}
                                            >
                                                <View className="flex-row items-center justify-between p-10">
                                                    <View className="flex-1">
                                                        <Text className="text-xl font-bold text-white">
                                                            {category}
                                                        </Text>
                                                        <Text className="mt-1 text-sm text-white/80">
                                                            {types.length}{" "}
                                                            product{" "}
                                                            {types.length === 1
                                                                ? "type"
                                                                : "types"}
                                                        </Text>
                                                    </View>
                                                    <View className="h-12 w-12 items-center justify-center rounded-full bg-white/20">
                                                        <MaterialIcons
                                                            name={
                                                                isExpanded
                                                                    ? "keyboard-arrow-up"
                                                                    : "keyboard-arrow-down"
                                                            }
                                                            size={24}
                                                            color="white"
                                                        />
                                                    </View>
                                                </View>
                                            </LinearGradient>
                                        )}
                                    </Pressable>

                                    {/* Product Types - Expandable */}
                                    {isExpanded && types.length > 0 && (
                                        <View className="mt-2 rounded-xl bg-gray-50 p-4">
                                            {types.map((type, typeIndex) => (
                                                <TouchableOpacity
                                                    key={typeIndex}
                                                    className="mb-2 flex-row items-center rounded-lg bg-white p-3 shadow-sm"
                                                    activeOpacity={0.7}
                                                >
                                                    <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                                                        <Ionicons
                                                            name="pricetag"
                                                            size={16}
                                                            color="#764ba2"
                                                        />
                                                    </View>
                                                    <Text className="flex-1 text-base text-gray-700">
                                                        {type.name
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            type.name.slice(1)}
                                                    </Text>
                                                    <View className="mr-2 rounded-full bg-purple-100 px-3 py-1">
                                                        <Text className="text-xs font-semibold text-purple-700">
                                                            {type.count}{" "}
                                                            {type.count === 1
                                                                ? "product"
                                                                : "products"}
                                                        </Text>
                                                    </View>
                                                    <MaterialIcons
                                                        name="arrow-forward-ios"
                                                        size={16}
                                                        color="#9CA3AF"
                                                    />
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            );
                        })
                    ) : (
                        <View className="mt-20 items-center">
                            <Ionicons
                                name="search-outline"
                                size={64}
                                color="#D1D5DB"
                            />
                            <Text className="mt-4 text-base text-gray-500">
                                No categories found
                            </Text>
                            <Text className="mt-1 text-sm text-gray-400">
                                Try searching with different keywords
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Discover;
