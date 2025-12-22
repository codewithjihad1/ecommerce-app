import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function CustomDrawer(props) {
    const { user, loading } = useSelector((state) => state.auth);
    const [theme, setTheme] = useState("light");
    const router = useRouter();

    const DrawerItem = ({ icon, label, route }) => (
        <TouchableOpacity
            onPress={() => {
                router.push(route);
                props.navigation.closeDrawer();
            }}
            className="flex-row items-center gap-4 rounded-xl px-5 py-4"
        >
            {icon}
            <Text className="text-base font-medium">{label}</Text>
        </TouchableOpacity>
    );

    if (loading && !user) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <DrawerContentScrollView {...props}>
            {/* Profile */}
            <View className="flex-row items-center gap-4 px-5 pb-8 pt-6">
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
                            {user?.user_metadata?.name?.charAt(0)}
                        </Text>
                    )}
                </View>
                <View>
                    <Text className="text-lg font-semibold">
                        {user?.user_metadata?.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                        {user?.user_metadata?.email}
                    </Text>
                </View>
            </View>

            {/* Main */}
            <View className="px-3">
                <DrawerItem
                    label="Homepage"
                    route="/(tabs)"
                    icon={<Ionicons name="home-outline" size={22} />}
                />

                <DrawerItem
                    label="Discover"
                    route="/(tabs)/home/discover"
                    icon={<Ionicons name="search-outline" size={22} />}
                />

                <DrawerItem
                    label="My Order"
                    route="/(tabs)/index/orders"
                    icon={<Feather name="shopping-bag" size={22} />}
                />

                <DrawerItem
                    label="My Profile"
                    route="/(tabs)/profile"
                    icon={<Ionicons name="person-outline" size={22} />}
                />

                <Text className="mb-3 mt-8 px-5 text-xs text-gray-400">
                    OTHER
                </Text>

                <DrawerItem
                    label="Setting"
                    route="/(tabs)/settings"
                    icon={<Ionicons name="settings-outline" size={22} />}
                />

                <DrawerItem
                    label="Support"
                    route="/support"
                    icon={<Ionicons name="mail-outline" size={22} />}
                />

                <DrawerItem
                    label="About us"
                    route="/about"
                    icon={
                        <Ionicons name="information-circle-outline" size={22} />
                    }
                />
            </View>

            {/* Theme Switch */}
            <View className="mx-5 mt-10 flex-row rounded-full bg-gray-100 py-2 px-5">
                <TouchableOpacity
                    className={`flex-1 items-center py-2 ${theme === "light" ? "rounded-full bg-white" : ""}`}
                    onPress={() => setTheme("light")}
                >
                    <Ionicons name="sunny-outline" size={18} />
                    <Text>Light</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 items-center py-2 ${theme === "dark" ? "rounded-full bg-white" : ""}`}
                    onPress={() => setTheme("dark")}
                >
                    <Ionicons name="moon-outline" size={18} />
                    <Text>Dark</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}
