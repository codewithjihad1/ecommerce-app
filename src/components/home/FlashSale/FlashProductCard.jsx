import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const FlashProductCard = ({ product }) => {
    return (
        <View className="relative mt-4 w-1/2">
            <View className="relative mb-2 rounded-lg bg-[#FFFFFF] shadow-md">
                <Image
                    className="h-[180px] w-[180px] rounded-lg border-[6px] border-white"
                    source={product.src}
                ></Image>

                <View className="absolute right-1.5 top-1.5"></View>
            </View>

            <View className="mt-1">
                <Text>{product.description}</Text>
                <View className="flex-row items-end gap-x-1">
                    <Text className="mt-1 text-xl font-bold">
                        ${product.rePrice}
                    </Text>
                    <Text
                        className="text-lg text-[#F1AEAE]"
                        style={{ textDecorationLine: "line-through" }}
                    >
                        ${product.price}
                    </Text>
                </View>
            </View>

            <View className="absolute right-2.5 top-1.5">
                <LinearGradient
                    colors={["#F91949", "#FE528A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ borderRadius: 6 }}
                >
                    <Text className="px-1.5 py-1 text-xs font-bold text-white">
                        -{product.discount}%
                    </Text>
                </LinearGradient>
            </View>
        </View>
    );
};

export default FlashProductCard;
