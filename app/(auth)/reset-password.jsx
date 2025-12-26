import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../src/lib/supabase";

export default function CreateNewPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    const handleConfirm = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            Alert.alert("Error", "Password must be at least 8 characters long");
            return;
        }

        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        Alert.alert("Success", "Password has been updated successfully");
        router.push("/");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-6 py-8">
                {/* Back Button */}
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="mb-8 h-8 w-8 items-center justify-center"
                >
                    <MaterialIcons name="chevron-left" size={24} color="#000" />
                </TouchableOpacity>

                {/* Header */}
                <Text className="mb-3 text-3xl font-bold">
                    Create new password
                </Text>
                <Text className="mb-10 text-base text-gray-500">
                    Your new password must be different from previously used
                    password
                </Text>

                {/* New Password Input */}
                <View className="mb-8">
                    <Text className="mb-3 text-base font-medium text-gray-800">
                        New Password
                    </Text>
                    <TextInput
                        className="border-b border-gray-300 py-3 text-base text-black"
                        placeholder="Enter new password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-12"
                    >
                        <MaterialIcons
                            name={
                                showPassword ? "visibility" : "visibility-off"
                            }
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View className="mb-12">
                    <Text className="mb-3 text-base font-medium text-gray-800">
                        Confirm Password
                    </Text>
                    <TextInput
                        className="border-b border-gray-300 py-3 text-base text-black"
                        placeholder="Confirm password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-0 top-12"
                    >
                        <MaterialIcons
                            name={
                                showConfirmPassword
                                    ? "visibility"
                                    : "visibility-off"
                            }
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                    onPress={handleConfirm}
                    className="mt-8 items-center rounded-full bg-gray-800 py-4"
                >
                    <Text className="text-lg font-semibold text-white">
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
