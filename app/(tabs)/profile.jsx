import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../src/store/slices/authSlice";

const menuItems = [
    {
        id: 1,
        icon: "location-outline",
        label: "Address",
        onPress: () => console.log("Navigate to Address"),
    },
    {
        id: 2,
        icon: "card-outline",
        label: "Payment method",
        onPress: () => console.log("Navigate to Payment"),
    },
    {
        id: 3,
        icon: "pricetag-outline",
        label: "Voucher",
        onPress: () => console.log("Navigate to Voucher"),
    },
    {
        id: 4,
        icon: "heart-outline",
        label: "My Wishlist",
        onPress: () => console.log("Navigate to Wishlist"),
    },
    {
        id: 5,
        icon: "star-outline",
        label: "Rate this app",
        onPress: () => console.log("Rate app"),
    },
];

export default function ProfileScreen() {
    const { user, loading } = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    // handle signout
    const handleSignout = async () => {
        try {
            await dispatch(signOut()).unwrap();
            router.push("/(auth)");
        } catch (error) {
            Alert.alert(error);
        }
    };

    if (loading && !user) {
        return <ActivityIndicator size="large" />;
    }

    // Add fallback for when user is null (e.g., after signout)
    if (!user) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
                <Text className="text-lg text-gray-700">
                    Please log in to view your profile.
                </Text>
                <TouchableOpacity
                    className="mt-4 rounded-lg bg-blue-500 px-6 py-2"
                    onPress={() => router.push("/(auth)")}
                >
                    <Text className="text-white">Go to Login</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="bg-white px-6 pb-6 pt-4">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-1 flex-row items-center">
                            {/* Profile Image */}
                            <View className="h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-pink-200">
                                {user?.user_metadata?.avatar ? (
                                    <Image
                                        source={{
                                            uri: user.user_metadata?.avatar,
                                        }}
                                        className="h-full w-full"
                                    />
                                ) : (
                                    <Text className="text-4xl font-bold">
                                        {user.user_metadata.name?.charAt(0)}
                                    </Text>
                                )}
                            </View>

                            {/* User Info */}
                            <View className="ml-4 flex-1">
                                <Text className="text-lg font-semibold text-gray-900">
                                    {user?.user_metadata?.name}
                                </Text>
                                <Text className="mt-0.5 text-sm text-gray-500">
                                    {user?.user_metadata?.email}
                                </Text>
                            </View>
                        </View>

                        {/* Settings Icon */}
                        <TouchableOpacity
                            className="h-10 w-10 items-center justify-center"
                            onPress={() => router.push("/settings")}
                        >
                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color="#374151"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="mx-4 mt-4 rounded-2xl bg-white shadow-sm">
                    {menuItems.map((item, index) => {
                        const isLast = index === menuItems.length - 1;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                className={`flex-row items-center px-5 py-4 ${
                                    !isLast ? "border-b border-gray-100" : ""
                                }`}
                                onPress={item.onPress}
                                activeOpacity={0.7}
                            >
                                <View className="h-6 w-6 items-center justify-center">
                                    <Ionicons
                                        name={item.icon}
                                        size={20}
                                        color="#9CA3AF"
                                    />
                                </View>

                                <Text className="ml-4 flex-1 text-base text-gray-700">
                                    {item.label}
                                </Text>

                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    className="mx-4 mb-6 mt-4 rounded-2xl bg-white shadow-sm"
                    onPress={handleSignout}
                    activeOpacity={0.7}
                >
                    <View className="flex-row items-center px-5 py-4">
                        <View className="h-6 w-6 items-center justify-center">
                            <Ionicons
                                name="log-out-outline"
                                size={20}
                                color="#9CA3AF"
                            />
                        </View>

                        <Text className="ml-4 flex-1 text-base text-gray-700">
                            Log out
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
