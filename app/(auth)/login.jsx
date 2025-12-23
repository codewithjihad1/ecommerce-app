import { Feather, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { signIn } from "../../src/store/slices/authSlice";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    //  handle Login
    const handleLogin = async () => {
        try {
            await dispatch(signIn({ email, password })).unwrap();
            router.push("/(tabs)/home");
        } catch (error) {
            Alert.alert(error);
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center">
            <View className="absolute -left-16 top-0 h-64 w-4/5">
                <Image
                    source={{
                        uri: "https://i.ibb.co.com/XrYwY35Y/bubble-02.png",
                    }}
                    className="h-full w-full"
                    resizeMode="contain"
                />
            </View>

            {/* Main Content */}
            <View className="flex-1 justify-center px-5 pt-10">
                {/* Title */}
                <Text className="mb-10 text-[48px] font-bold leading-[56px] text-black">
                    Login
                </Text>

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
                        {!showPassword ? (
                            <Ionicons name="eye" size={20} color="black" />
                        ) : (
                            <Ionicons name="eye-off" size={20} color="black" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* forget password */}
                <View className="mb-6 mt-2 flex-row justify-end">
                    <Link
                        href="/forget-password"
                        className="text-xl text-primary"
                    >
                        Forget Password
                    </Link>
                </View>

                {/* Done Button */}
                <TouchableOpacity
                    className="mb-4 items-center rounded-xl bg-[#0066FF] py-4 shadow-lg"
                    onPress={handleLogin}
                >
                    <Text className="text-lg font-semibold text-white">
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="mt-8 flex-row items-center justify-center gap-3"
                    onPress={() => router.push("/(auth)/signup")}
                >
                    <Text className="text-xl">
                        {"I don't have any account. "}
                    </Text>
                    <Feather
                        name="arrow-right"
                        size={18}
                        color="white"
                        className="rounded-full bg-blue-500 p-1"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
