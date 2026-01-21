import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch } from "react-redux";
import { signUp } from "../../src/store/slices/authSlice";
import SocialLogin from "../../src/components/auth/SocialLogin";

export default function CreateAccountScreen() {
    const [imgUri, setImgUri] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    // handle signup
    const handleSignup = async () => {
        if (!imgUri) return;

        try {
            await dispatch(
                signUp({ email, password, metadata: { name, avatar: imgUri } }),
            ).unwrap();
            router.push("/(tabs)");
        } catch (error) {
            Alert.alert(error);
        }
    };

    // pick image
    const pickImage = async () => {
        setLoading(true);
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                "Sorry, we need camera roll permission to upload images.",
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) return;

        const uri = result.assets[0].uri;

        const formData = new FormData();
        formData.append("image", {
            uri: uri,
            name: "upload.jpg",
            type: "image/jpeg",
        });

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.EXPO_PUBLIC_IMGBB_KEY}`,
            {
                method: "POST",
                body: formData,
            },
        );
        const text = await response.text();
        const { data } = JSON.parse(text);
        if (data?.url) setImgUri(data.url);
        setLoading(false);
    };

    const handleSocialLoginSuccess = () => {
        router.replace("/");
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F5F5F7]">
            <ScrollView>
                {/* Blue Circle bg */}
                <View className="absolute right-[-75px] top-20 h-64 w-64">
                    <Image
                        source={{
                            uri: "https://i.ibb.co/xSnrBmhY/bg-img2.png",
                        }}
                        className="h-full w-full"
                        resizeMode="contain"
                    />
                </View>

                {/* Top left bg */}
                <View className="absolute left-20 top-20 h-64 w-64">
                    <Image
                        source={{ uri: "https://i.ibb.co/xNSK0qg/bg-img1.png" }}
                        className="h-full w-full"
                        resizeMode="contain"
                    />
                </View>

                {/* Main Content */}
                <View className="flex-1 px-5 pt-10">
                    {/* Title */}
                    <Text className="mb-10 text-[48px] font-bold leading-[56px] text-black">
                        Create{"\n"}Account
                    </Text>

                    {/* Camera Icon */}
                    <View className="mb-10">
                        <Pressable onPress={pickImage} disabled={loading}>
                            {imgUri ? (
                                <Image
                                    source={{ uri: imgUri }}
                                    className="h-24 w-24 rounded-full"
                                />
                            ) : (
                                <Image
                                    source={{
                                        uri: "https://i.ibb.co/R4sthN5h/upload-icon.png",
                                    }}
                                    className="h-24 w-24 rounded-full"
                                />
                            )}
                        </Pressable>
                    </View>

                    {/* Name Input */}
                    <TextInput
                        className="mb-4 rounded-xl bg-white px-5 py-4 text-base shadow-sm"
                        placeholder="Enter your Full Name"
                        placeholderTextColor="#C7C7CD"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />

                    {/* Email input */}
                    <TextInput
                        className="mb-4 rounded-xl bg-white px-5 py-4 text-base shadow-sm"
                        placeholder="Email"
                        placeholderTextColor="#C7C7CD"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    {/* Password Input */}
                    <View className="mb-4 flex-row items-center rounded-xl bg-white px-5 py-4 shadow-sm">
                        <TextInput
                            className="flex-1 text-base"
                            placeholder="Password"
                            placeholderTextColor="#C7C7CD"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text className="text-lg">
                                {!showPassword ? (
                                    <Ionicons
                                        name="eye"
                                        size={24}
                                        color="black"
                                    />
                                ) : (
                                    <Ionicons
                                        name="eye-off"
                                        size={24}
                                        color="black"
                                    />
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Done Button */}
                    <TouchableOpacity
                        className="mb-4 items-center rounded-xl bg-[#0066FF] py-4 shadow-lg"
                        onPress={handleSignup}
                    >
                        <Text className="text-lg font-semibold text-white">
                            Signup
                        </Text>
                    </TouchableOpacity>

                    {/* Social Login */}
                    <SocialLogin onSuccess={handleSocialLoginSuccess} />

                    <TouchableOpacity
                        className="mt-8 flex-row items-center justify-center gap-3"
                        onPress={() => router.push("/(auth)/login")}
                    >
                        <Text className="text-xl">
                            I already have an account
                        </Text>
                        <Feather
                            name="arrow-right"
                            size={18}
                            color="white"
                            className="rounded-full bg-blue-500 p-1"
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
