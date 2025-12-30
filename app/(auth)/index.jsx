import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { checkSession } from '../../src/store/slices/authSlice';


export default function AuthScreen() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkSession());
    }, [dispatch]);

    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <View className="mb-6 h-24 w-24 rounded-full bg-slate-50 p-5">
                <Image
                    source={{
                        uri: "https://i.ibb.co/jPYj3TLJ/shoping-icon.png",
                    }}
                    className="h-full w-full"
                />
            </View>
            <View className="mb-16 w-3/5 flex-col items-center">
                <Text className="mb-4 text-center text-6xl font-bold">
                    Shoppe
                </Text>
                <Text className="text-center text-xl leading-8">
                    Beautiful eCommerce UI Kit for your online store
                </Text>
            </View>
            <View>
                <Pressable onPress={() => router.push("/signup")}>
                    <Text className="w-full rounded-xl bg-primary px-6 py-3 text-center text-xl text-white">
                        {"Let's get started"}
                    </Text>
                </Pressable>
                <TouchableOpacity
                    className="mt-8 flex-row items-center gap-3"
                    onPress={() => router.push("/login")}
                >
                    <Text className="text-xl">I already have an account</Text>
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
