import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center px-6">
                {/* Icon */}
                <MaterialCommunityIcons
                    name="magnify"
                    size={80}
                    color="#d1d5db"
                    style={{ marginBottom: 24 }}
                />

                {/* 404 Text */}
                <Text className="mb-4 text-6xl font-bold text-gray-900">
                    404
                </Text>

                {/* Heading */}
                <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
                    Page Not Found
                </Text>

                {/* Description */}
                <Text className="mb-8 text-center text-base text-gray-500">
                    {
                        "Sorry, we couldn't find the page you're looking for. It might have been removed or the link may be incorrect."
                    }
                </Text>

                {/* Buttons */}
                <View className="w-full gap-3">
                    <Button
                        mode="contained"
                        onPress={() => router.push("/(tabs)/home")}
                        className="py-1"
                    >
                        Go Home
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={() => router.back()}
                        className="py-1"
                    >
                        Go Back
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}
