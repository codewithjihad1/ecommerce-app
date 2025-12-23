import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const features = [
    {
        icon: "diamond-outline",
        title: "Premium Quality",
        description: "Carefully curated products from trusted brands worldwide",
    },
    {
        icon: "shield-checkmark-outline",
        title: "Secure Shopping",
        description:
            "Your data and transactions are protected with bank-level security",
    },
    {
        icon: "rocket-outline",
        title: "Fast Delivery",
        description: "Quick and reliable shipping to your doorstep",
    },
    {
        icon: "heart-outline",
        title: "Customer First",
        description: "24/7 support team ready to assist you",
    },
];

const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Products" },
    { number: "100+", label: "Brands" },
    { number: "4.8★", label: "App Rating" },
];

const teamValues = [
    {
        icon: "checkmark-circle",
        title: "Trust",
        description: "Building lasting relationships through transparency",
    },
    {
        icon: "flash",
        title: "Innovation",
        description: "Constantly improving your shopping experience",
    },
    {
        icon: "leaf",
        title: "Sustainability",
        description: "Committed to eco-friendly practices",
    },
];

const AboutUs = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <View className="flex-1 bg-white">
            <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
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

                <Text className="text-xl font-bold">About Gemstore</Text>

                <View className="w-10" />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <LinearGradient
                    colors={["#004CFF", "#764ba2"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="mx-5 mt-6 overflow-hidden rounded-3xl"
                >
                    <View className="items-center py-8">
                        <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-white/20">
                            <Ionicons name="diamond" size={40} color="white" />
                        </View>
                        <Text className="mb-2 text-3xl font-bold text-white">
                            Gemstore
                        </Text>
                        <Text className="text-center text-base text-white/90">
                            Your Premium Shopping Destination
                        </Text>
                    </View>
                </LinearGradient>

                <View className="mx-5 mt-8">
                    <Text className="mb-3 text-2xl font-bold text-gray-800">
                        Our Story
                    </Text>
                    <Text className="text-base leading-6 text-gray-600">
                        Founded in 2025, Gemstore began with a simple mission:
                        to make premium shopping accessible to everyone. We
                        believe that quality products shouldn&apos;t be a
                        luxury, but a standard.
                        {"\n\n"}
                        Today, we&#39;re proud to serve over 50,000 happy
                        customers worldwide, offering carefully curated products
                        from the best brands in the industry.
                    </Text>
                </View>

                <View className="mx-5 mt-8">
                    <View className="flex-row flex-wrap gap-3">
                        {stats.map((stat, index) => (
                            <View
                                key={index}
                                className="min-w-[45%] flex-1 items-center rounded-2xl bg-purple-50 p-5"
                            >
                                <Text className="text-3xl font-bold text-[#004CFF]">
                                    {stat.number}
                                </Text>
                                <Text className="mt-1 text-sm text-gray-600">
                                    {stat.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View className="mx-5 mt-8">
                    <Text className="mb-4 text-2xl font-bold text-gray-800">
                        Why Choose Us
                    </Text>
                    {features.map((feature, index) => (
                        <View
                            key={index}
                            className="mb-4 flex-row items-center rounded-2xl bg-gray-50 p-5"
                        >
                            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <Ionicons
                                    name={feature.icon}
                                    size={24}
                                    color="#004CFF"
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="mb-1 text-lg font-semibold text-gray-800">
                                    {feature.title}
                                </Text>
                                <Text className="text-sm leading-5 text-gray-600">
                                    {feature.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View className="mx-5 mt-8">
                    <Text className="mb-4 text-2xl font-bold text-gray-800">
                        Our Values
                    </Text>
                    <View className="rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 p-5">
                        {teamValues.map((value, index) => (
                            <View
                                key={index}
                                className={`flex-row items-center ${index !== teamValues.length - 1 ? "mb-5 border-b border-gray-200 pb-5" : ""}`}
                            >
                                <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-white">
                                    <Ionicons
                                        name={value.icon}
                                        size={20}
                                        color="#004CFF"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="mb-1 text-base font-semibold text-gray-800">
                                        {value.title}
                                    </Text>
                                    <Text className="text-sm text-gray-600">
                                        {value.description}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Contact Section */}
                <View className="mx-5 mt-8">
                    <Text className="mb-4 text-2xl font-bold text-gray-800">
                        Get in Touch
                    </Text>
                    <View className="rounded-2xl border border-gray-200 p-5">
                        <TouchableOpacity className="mb-4 flex-row items-center">
                            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-purple-50">
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color="#004CFF"
                                />
                            </View>
                            <View>
                                <Text className="text-sm text-gray-500">
                                    Email Us
                                </Text>
                                <Text className="text-base font-medium text-gray-800">
                                    support@gemstore.com
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="mb-4 flex-row items-center">
                            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-purple-50">
                                <Ionicons
                                    name="call-outline"
                                    size={20}
                                    color="#004CFF"
                                />
                            </View>
                            <View>
                                <Text className="text-sm text-gray-500">
                                    Call Us
                                </Text>
                                <Text className="text-base font-medium text-gray-800">
                                    +(88) 017123451234
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center">
                            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-purple-50">
                                <Ionicons
                                    name="location-outline"
                                    size={20}
                                    color="#004CFF"
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm text-gray-500">
                                    Visit Us
                                </Text>
                                <Text className="text-base font-medium text-gray-800">
                                    Mohammadpur, Dhaka
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mx-5 mt-8">
                    <Text className="mb-4 text-center text-base text-gray-600">
                        Follow Us On
                    </Text>
                    <View className="flex-row justify-center gap-4">
                        <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Ionicons
                                name="logo-facebook"
                                size={24}
                                color="#004CFF"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Ionicons
                                name="logo-instagram"
                                size={24}
                                color="#004CFF"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Ionicons
                                name="logo-twitter"
                                size={24}
                                color="#004CFF"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Ionicons
                                name="logo-linkedin"
                                size={24}
                                color="#004CFF"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View className="mx-5 mt-8">
                    <Text className="text-center text-sm text-gray-400">
                        © 2024 Gemstore. All rights reserved.
                    </Text>
                    <Text className="mt-2 text-center text-xs text-gray-400">
                        Version 1.0.0
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default AboutUs;
