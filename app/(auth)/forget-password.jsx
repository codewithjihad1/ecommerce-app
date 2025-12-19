import { FontAwesome } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../src/lib/supabase";

export default function ForgetPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const redirectLink = Linking.createURL("reset-password");

    const handleForget = async () => {
        try {
            await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: redirectLink,
            });

            Alert.alert(
                "Success",
                "Email will be sent. please check your email.",
            );
        } catch (error) {
            Alert.alert(error);
        }
    };

    return (
        <SafeAreaView>
            <View className="flex-row items-center px-6">
                <FontAwesome
                    name="angle-left"
                    size={32}
                    color="blue"
                    className="mt-3"
                    onPress={() => router.back()}
                />
                <Text className="m-4 mb-1 text-2xl font-bold">
                    Forget Password
                </Text>
            </View>

            <View className="mb-20 mt-6 px-5">
                <Text>
                    Enter email associated with your account and we’ll send and
                    email with intructions to reset your password
                </Text>
            </View>

            <View className="mx-5">
                <FontAwesome
                    name="envelope"
                    color="gray"
                    className="absolute top-1/2 -translate-y-1/2"
                    size={14}
                />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    className="border-b-2 border-gray-300 px-8 py-3"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity
                onPress={handleForget}
                className="mx-6 mt-8 items-center rounded-full bg-gray-800 px-5 py-3"
            >
                <Text className="text-lg font-semibold text-white">
                    Confirm
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
