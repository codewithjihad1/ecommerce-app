import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSanityProducts } from "../hooks/useSanityProducts";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Discover = () => {
    const { products } = useSanityProducts();
    const [subCategory, setSubCategory] = useState([]);
    console.log(products[3]);
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <ScrollView>
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
            
            <View className="mt-4 flex-row justify-center bg-white px-16">
                <View className="flex-1 shadow-sm">
                    <Ionicons
                        name="search"
                        size={20}
                        color="#9CA3AF"
                        style={{
                            position: "absolute",
                            left: 16,
                            top: "50%",
                            transform: [{ translateY: -10 }],
                            zIndex: 1,
                        }}
                    />
                    <TextInput
                        className="flex items-center rounded-full bg-[#FAFAFA] px-12 py-3 text-lg"
                        placeholder="Search"
                    ></TextInput>
                </View>
            </View>
        </ScrollView>
    );
};

export default Discover;
