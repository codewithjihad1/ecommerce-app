import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSanityProducts } from "../hooks/useSanityProducts";

const Discover = () => {
    const { products } = useSanityProducts();
    const [subCategory, setSubCategory] = useState([]);
    console.log(products[3]);

    return (
        <ScrollView>
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
