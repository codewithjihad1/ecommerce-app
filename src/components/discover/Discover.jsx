import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux"; // Added to get category
import { useSanityProducts } from "../hooks/useSanityProducts";

const Discover = () => {
    const { categoryName } = useSelector((state) => state.categoryName);
    const router = useRouter();
    const { products, loading } = useSanityProducts({
        category: categoryName,
        limit: 1000,
    });

    const [subCategory, setSubCategory] = useState([]);
    const [productType, setProductType] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategory, setExpandedCategory] = useState(null);

    useEffect(() => {
        if (!products || products.length === 0) return;
        const uniqueSubCategories = [
            ...new Set(products.map((p) => p.subcategoryName).filter(Boolean)),
        ];

        const newProductTypes = [];
        uniqueSubCategories.forEach((uc) => {
            const categoryProducts = products.filter(
                (p) => uc === p.subcategoryName,
            );

            const typeCountMap = {};
            categoryProducts.forEach((p) => {
                const type = p.producttype;
                if (type) {
                    typeCountMap[type] = (typeCountMap[type] || 0) + 1;
                }
            });

            const typesWithCount = Object.entries(typeCountMap).map(
                ([type, count]) => ({
                    name: type,
                    count: count,
                }),
            );

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
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const filteredCategories = subCategory.filter((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const getCategoryTypes = (categoryName) => {
        const categoryData = productType.find((pt) => pt.name === categoryName);
        return categoryData?.types || [];
    };

    // 3. Updated Navigation: Pass both Subcategory and Product Type
    const handleGotoProducts = (subcat, type) => {
        router.push({
            pathname: "/product/products",
            params: {
                subcategory: subcat.toLowerCase(),
                type: type.name.toLowerCase(),
            },
        });
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#004CFF" />
                <Text className="mt-3 text-gray-500">
                    Loading categories...
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">
                    Discover {categoryName}
                </Text>
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
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* Categories List */}
                <View className="mx-5 mt-4">
                    {filteredCategories.map((category, index) => {
                        const isExpanded = expandedCategory === category;
                        const types = getCategoryTypes(category);

                        return (
                            <View key={index} className="mb-4">
                                <Pressable
                                    onPress={() =>
                                        handleCategoryPress(category)
                                    }
                                >
                                    <LinearGradient
                                        colors={["#004CFF", "#764ba2"]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        className="rounded-2xl"
                                    >
                                        <View className="flex-row items-center justify-between p-10">
                                            <View className="flex-1">
                                                <Text className="text-xl font-bold text-white">
                                                    {category}
                                                </Text>
                                                <Text className="mt-1 text-sm text-white/80">
                                                    {types.length} types
                                                </Text>
                                            </View>
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
                                    </LinearGradient>
                                </Pressable>

                                {isExpanded && (
                                    <View className="mt-2 rounded-xl bg-gray-50 p-4">
                                        {types.map((type, typeIndex) => (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleGotoProducts(
                                                        category,
                                                        type,
                                                    )
                                                }
                                                key={typeIndex}
                                                className="mb-2 flex-row items-center rounded-lg bg-white p-3 shadow-sm"
                                            >
                                                <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                                    <Ionicons
                                                        name="pricetag"
                                                        size={16}
                                                        color="#004CFF"
                                                    />
                                                </View>
                                                <Text className="flex-1 text-base capitalize text-gray-700">
                                                    {type.name}
                                                </Text>
                                                <View className="rounded-full bg-blue-50 px-3 py-1">
                                                    <Text className="text-xs font-semibold text-blue-600">
                                                        {type.count}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default Discover;
