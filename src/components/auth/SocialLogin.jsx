// components/SocialLogin.jsx
import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { useDispatch } from "react-redux";
import { setSession, signInWithOAuth } from "../../store/slices/authSlice";
import { supabase } from "../../lib/supabase";

WebBrowser.maybeCompleteAuthSession();

const SocialLogin = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);

    const redirectUrl = makeRedirectUri({
        scheme: "ecommerceapp",
        path: "auth/callback",
    });

    const handleSocialLogin = async (provider) => {
        try {
            setLoading(true);
            const result = await dispatch(
                signInWithOAuth({ provider }),
            ).unwrap();

            if (result?.url) {
                setModalVisible(false);

                setTimeout(async () => {
                    const authResult = await WebBrowser.openAuthSessionAsync(
                        result.url,
                        redirectUrl,
                    );

                    if (authResult.type === "success") {
                        const { data: sessionData, error: sessionError } =
                            await supabase.auth.getSessionFromUrl({
                                url: authResult.url,
                            });

                        if (sessionError) throw sessionError;

                        if (sessionData?.session) {
                            dispatch(setSession(sessionData.session));
                            onSuccess?.(sessionData.session.user);
                        }
                    } else if (authResult.type === "cancel") {
                        Alert.alert("Cancelled", "Sign in was cancelled");
                    }
                    setLoading(false);
                    setSelectedProvider(null);
                }, 300);
            }
        } catch (error) {
            console.error(`${provider} login error:`, error);
            Alert.alert(
                "Login Failed",
                error.message || "Something went wrong",
            );
            setLoading(false);
            setModalVisible(false);
            setSelectedProvider(null);
        }
    };

    const openModal = (provider) => {
        setSelectedProvider(provider);
        setModalVisible(true);
    };

    const getProviderConfig = () => {
        const configs = {
            google: {
                name: "Google",
                icon: "google",
                color: "#DB4437",
                bgColor: "#EBF5FF",
                buttonColor: "#4285F4",
            },
            github: {
                name: "GitHub",
                icon: "github",
                color: "#181717",
                bgColor: "#F3F4F6",
                buttonColor: "#181717",
            },
        };
        return configs[selectedProvider] || configs.google;
    };

    const config = getProviderConfig();

    return (
        <View className="w-full">
            <View className="my-6 flex-row items-center">
                <View className="h-[1px] flex-1 bg-gray-300" />
                <Text className="mx-4 text-gray-500">Or continue with</Text>
                <View className="h-[1px] flex-1 bg-gray-300" />
            </View>

            {/* Google Login Button */}
            <TouchableOpacity
                className="mb-3 flex-row items-center justify-center rounded-xl border border-gray-300 bg-white p-4 shadow-lg"
                onPress={() => openModal("google")}
                disabled={loading}
            >
                <AntDesign name="google" size={24} color="#DB4437" />
                <Text className="ml-3 text-base font-semibold text-gray-700">
                    Continue with Google
                </Text>
            </TouchableOpacity>

            {/* GitHub Login Button */}
            <TouchableOpacity
                className="flex-row items-center justify-center rounded-xl border border-gray-300 bg-white p-4 shadow-lg"
                onPress={() => openModal("github")}
                disabled={loading}
            >
                <AntDesign name="github" size={24} color="black" />
                <Text className="ml-3 text-base font-semibold text-gray-700">
                    Continue with GitHub
                </Text>
            </TouchableOpacity>

            {/* Social Sign-In Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => !loading && setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => !loading && setModalVisible(false)}
                >
                    <Pressable
                        style={styles.modalContent}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View className="items-center rounded-3xl bg-white p-6">
                            {/* Provider Icon */}
                            <View
                                className="mb-4 h-20 w-20 items-center justify-center rounded-full"
                                style={{ backgroundColor: config.bgColor }}
                            >
                                <AntDesign
                                    name={config.icon}
                                    size={48}
                                    color={config.color}
                                />
                            </View>

                            {/* Title */}
                            <Text className="mb-2 text-2xl font-bold text-gray-900">
                                Sign in with {config.name}
                            </Text>

                            {/* Description */}
                            <Text className="mb-6 text-center text-base text-gray-600">
                                You&apos;ll be redirected to {config.name} to
                                complete the sign-in process
                            </Text>

                            {/* Sign In Button */}
                            <TouchableOpacity
                                className="mb-3 w-full rounded-lg py-4"
                                style={{ backgroundColor: config.buttonColor }}
                                onPress={() =>
                                    handleSocialLogin(selectedProvider)
                                }
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <View className="flex-row items-center justify-center">
                                        <MaterialIcons
                                            name="login"
                                            size={20}
                                            color="white"
                                        />
                                        <Text className="ml-2 text-base font-semibold text-white">
                                            Continue with {config.name}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            {/* Cancel Button */}
                            <TouchableOpacity
                                className="w-full rounded-lg border border-gray-300 bg-white py-4"
                                onPress={() => {
                                    setModalVisible(false);
                                    setSelectedProvider(null);
                                }}
                                disabled={loading}
                            >
                                <Text className="text-center text-base font-semibold text-gray-700">
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            {/* Privacy Note */}
                            <Text className="mt-4 text-center text-xs text-gray-500">
                                By continuing, you agree to our Terms of Service
                                and Privacy Policy
                            </Text>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        width: "100%",
        maxWidth: 400,
    },
});

export default SocialLogin;
