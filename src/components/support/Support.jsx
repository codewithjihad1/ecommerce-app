import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Linking,
} from "react-native";
import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const quickActions = [
    {
        icon: "chatbubble-ellipses-outline",
        title: "Live Chat",
        description: "Chat with our team",
        color: "#667eea",
        action: () => console.log("Open live chat"),
    },
    {
        icon: "call-outline",
        title: "Call Us",
        description: "+88017123451234",
        color: "#06b6d4",
        action: () => Linking.openURL("tel:+88017123451234"),
    },
    {
        icon: "mail-outline",
        title: "Email",
        description: "support@gemstore.com",
        color: "#8b5cf6",
        action: () => Linking.openURL("mailto:support@gemstore.com"),
    },
    {
        icon: "logo-whatsapp",
        title: "WhatsApp",
        description: "Message us",
        color: "#10b981",
        action: () => Linking.openURL("https://wa.me/15551234567"),
    },
];

const faqs = [
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be unused and in original packaging. Simply initiate a return request from your order history and follow the instructions.",
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery. You'll receive a tracking number once your order ships.",
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes! We ship to over 50 countries worldwide. International shipping times vary by location, typically 7-14 business days. Customs fees may apply.",
    },
    {
        question: "How can I cancel my order?",
        answer: "Orders can be cancelled within 1 hour of placement. Go to 'My Orders', select the order, and click 'Cancel Order'. After processing begins, cancellation may not be possible.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and bank transfers.",
    },
];

const Support = () => {
    const router = useRouter();
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleGoBack = () => {
        router.back();
    };

    const handleFAQPress = (index) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    const handleSubmit = () => {
        if (!name || !email || !message) {
            alert("Please fill in all fields");
            return;
        }
        // Handle form submission
        console.log({ name, email, message });
        alert("Message sent! We'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
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

                <Text className="text-2xl font-bold">Support Center</Text>

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
                    className="mx-5 mt-6 overflow-hidden rounded-3xl p-8"
                >
                    <View className="items-center py-8">
                        <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-white/20">
                            <Ionicons
                                name="headset-outline"
                                size={32}
                                color="white"
                            />
                        </View>
                        <Text className="mb-2 text-2xl font-bold text-white">
                            How can we help you?
                        </Text>
                        <Text className="text-center text-sm text-white/90">
                            We&apos;re here 24/7 to assist you
                        </Text>
                    </View>
                </LinearGradient>

                <View className="mx-5 mt-8">
                    <Text className="mb-4 text-lg font-bold text-gray-800">
                        Quick Contact
                    </Text>
                    <View className="flex-row flex-wrap gap-3">
                        {quickActions.map((action, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={action.action}
                                className="min-w-[45%] flex-1 rounded-2xl bg-gray-50 p-5"
                                activeOpacity={0.7}
                            >
                                <View
                                    className="mb-3 h-12 w-12 items-center justify-center rounded-full"
                                    style={{
                                        backgroundColor: `${action.color}20`,
                                    }}
                                >
                                    <Ionicons
                                        name={action.icon}
                                        size={24}
                                        color={action.color}
                                    />
                                </View>
                                <Text className="mb-1 text-base font-semibold text-gray-800">
                                    {action.title}
                                </Text>
                                <Text className="text-xs text-gray-500">
                                    {action.description}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="mx-5 mt-8">
                    <View className="mb-4 flex-row items-center justify-between">
                        <Text className="text-lg font-bold text-gray-800">
                            Frequently Asked Questions
                        </Text>
                        {/* <View className="rounded-full bg-purple-100 px-3 py-1">
                            <Text className="text-xs font-semibold text-purple-700">
                                {faqs.length} FAQs
                            </Text>
                        </View> */}
                    </View>

                    {faqs.map((faq, index) => {
                        const isExpanded = expandedFAQ === index;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleFAQPress(index)}
                                className="mb-3 overflow-hidden rounded-2xl border border-blue-200 bg-white"
                                activeOpacity={0.7}
                            >
                                <View className="flex-row items-center justify-between p-4">
                                    <View className="mr-3 flex-1">
                                        <Text className="text-base font-semibold text-gray-800">
                                            {faq.question}
                                        </Text>
                                    </View>
                                    <View
                                        className={`h-8 w-8 items-center justify-center rounded-full ${isExpanded ? "bg-purple-100" : "bg-gray-100"}`}
                                    >
                                        <MaterialIcons
                                            name={
                                                isExpanded
                                                    ? "keyboard-arrow-up"
                                                    : "keyboard-arrow-down"
                                            }
                                            size={20}
                                            color={
                                                isExpanded
                                                    ? "#004CFF"
                                                    : "#6b7280"
                                            }
                                        />
                                    </View>
                                </View>

                                {isExpanded && (
                                    <View className="border-t border-gray-100 bg-gray-50 p-4">
                                        <Text className="text-sm leading-6 text-gray-600">
                                            {faq.answer}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View className="mx-5 mt-8">
                    <Text className="mb-4 text-lg font-bold text-gray-800">
                        Send us a Message
                    </Text>
                    <View className="rounded-2xl border border-blue-200 p-5">
                        {/* Name Input */}
                        <View className="mb-4">
                            <Text className="mb-2 text-sm font-medium text-gray-700">
                                Your Name
                            </Text>
                            <View className="flex-row items-center rounded-xl bg-gray-50 px-4">
                                <Ionicons
                                    name="person-outline"
                                    size={20}
                                    color="#9CA3AF"
                                />
                                <TextInput
                                    className="flex-1 py-3 pl-3 text-base"
                                    placeholder="John Doe"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        {/* Email Input */}
                        <View className="mb-4">
                            <Text className="mb-2 text-sm font-medium text-gray-700">
                                Email Address
                            </Text>
                            <View className="flex-row items-center rounded-xl bg-gray-50 px-4">
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color="#9CA3AF"
                                />
                                <TextInput
                                    className="flex-1 py-3 pl-3 text-base"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="mb-2 text-sm font-medium text-gray-700">
                                Your Message
                            </Text>
                            <View className="rounded-xl bg-gray-50 p-4">
                                <TextInput
                                    className="min-h-[100px] text-base"
                                    placeholder="How can we help you?"
                                    value={message}
                                    onChangeText={setMessage}
                                    multiline
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            onPress={handleSubmit}
                            className="w-1/2 rounded-xl overflow-hidden"
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={["#004CFF", "#764ba2"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className=""
                            >
                                <View className="flex-row items-center px-5 py-3">
                                    <Ionicons
                                        name="send"
                                        size={20}
                                        color="white"
                                    />
                                    <Text className="ml-2 text-base font-semibold text-white">
                                        Send Message
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mx-5 mt-8 rounded-2xl bg-purple-50 p-5">
                    <View className="mb-3 flex-row items-center">
                        <Ionicons
                            name="time-outline"
                            size={24}
                            color="#004CFF"
                        />
                        <Text className="ml-3 text-lg font-bold text-gray-800">
                            Support Hours
                        </Text>
                    </View>
                    <View className="space-y-2">
                        <View className="flex-row justify-between py-1">
                            <Text className="text-gray-600">
                                Monday - Friday
                            </Text>
                            <Text className="font-medium text-gray-800">
                                9:00 AM - 8:00 PM
                            </Text>
                        </View>
                        <View className="flex-row justify-between py-1">
                            <Text className="text-gray-600">Saturday</Text>
                            <Text className="font-medium text-gray-800">
                                10:00 AM - 6:00 PM
                            </Text>
                        </View>
                        <View className="flex-row justify-between py-1">
                            <Text className="text-gray-600">Sunday</Text>
                            <Text className="font-medium text-gray-800">
                                Closed
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Support;
