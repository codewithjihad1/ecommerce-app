import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

const DrawerMenu = ({ onClose }) => {
    const pathname = usePathname();
    const { user, loading } = useSelector((state) => state.auth);
    const [theme, setTheme] = useState("light");
    const router = useRouter();

    const DrawerItem = ({ icon, label, route }) => (
        <TouchableOpacity
            onPress={() => {
                router.push(route);
                onClose();
            }}
            className={`flex-row items-center gap-4 rounded-xl px-5 py-4 ${pathname === route ? "bg-gray-200" : ""}`}
        >
            {icon}
            <Text className="text-base font-medium">{label}</Text>
        </TouchableOpacity>
    );
    // console.log(pathname);

    if (loading && !user) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <SafeAreaView>
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

            <View className="mt-3 px-3">
                <DrawerItem
                    label="Homepage"
                    route="/"
                    icon={<Ionicons name="home-outline" size={22} />}
                />

                <DrawerItem
                    label="Discover"
                    route="/discover"
                    icon={<Ionicons name="search-outline" size={22} />}
                />

                <DrawerItem
                    label="My Order"
                    route="/orders"
                    icon={<Feather name="shopping-bag" size={22} />}
                />

                <DrawerItem
                    label="My Profile"
                    route="/profile"
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
            <View className="mx-5 mt-10 flex-row rounded-full bg-gray-100 px-5 py-2">
                <TouchableOpacity
                    className={`flex-1 flex-row items-center gap-4 px-4 ${theme === "light" ? "rounded-full bg-white" : ""}`}
                    onPress={() => setTheme("light")}
                >
                    <Ionicons name="sunny" size={18} color="black" />
                    <Text>Light</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 flex-row items-center gap-4 px-4 py-2 ${theme === "dark" ? "rounded-full bg-white" : ""}`}
                    onPress={() => setTheme("dark")}
                >
                    <Ionicons name="moon" color="black" size={18} />
                    <Text>Dark</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DrawerMenu;
