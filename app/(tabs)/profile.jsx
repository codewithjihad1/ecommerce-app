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
    const { user } = useSelector((state) => state.auth);
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

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-6 pt-4 pb-6 bg-white">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                            {/* Profile Image */}
                            <View className="w-16 h-16 rounded-full bg-pink-200 items-center justify-center overflow-hidden">
                                {user.user_metadata?.avatar ? (
                                    <Image
                                        source={{
                                            uri: user.user_metadata?.avatar,
                                        }}
                                        className="w-full h-full"
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
                                <Text className="text-sm text-gray-500 mt-0.5">
                                    {user?.user_metadata?.email}
                                </Text>
                            </View>
                        </View>

                        {/* Settings Icon */}
                        <TouchableOpacity
                            className="w-10 h-10 items-center justify-center"
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
                <View className="mt-4 mx-4 bg-white rounded-2xl shadow-sm">
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
                                <View className="w-6 h-6 items-center justify-center">
                                    <Ionicons
                                        name={item.icon}
                                        size={20}
                                        color="#9CA3AF"
                                    />
                                </View>

                                <Text className="flex-1 ml-4 text-base text-gray-700">
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
                    className="mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-sm"
                    onPress={handleSignout}
                    activeOpacity={0.7}
                >
                    <View className="flex-row items-center px-5 py-4">
                        <View className="w-6 h-6 items-center justify-center">
                            <Ionicons
                                name="log-out-outline"
                                size={20}
                                color="#9CA3AF"
                            />
                        </View>

                        <Text className="flex-1 ml-4 text-base text-gray-700">
                            Log out
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
