import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
    const router = useRouter();

    return (
        <SafeAreaView>
            <View className="flex-1 justify-center">
                <Text>404 page not found</Text>

                <Button mode="contained" onPress={() => router.back()}>
                    Go Back
                </Button>
            </View>
        </SafeAreaView>
    );
}
