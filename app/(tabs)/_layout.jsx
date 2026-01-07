import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSelector } from "react-redux";

export default function TabLayout() {
    const wishListItems = useSelector((state) => state.wishlist.items || []);
    const cartItems = useSelector((state) => state.cart.items);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="wishlist"
                options={{
                    title: "Wishlist",
                    tabBarBadge: wishListItems.length,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarBadge: cartItems.length,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
