import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
    decreasedQty,
    increasedQty,
    removeFromCart,
} from "../../src/store/slices/cartSlice";

export default function Cart() {
    const router = useRouter();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mx-5 py-5">
                    {/* Header */}
                    <Text className="text-4xl font-bold">Cart</Text>
                    <Text className="text-gray-500">
                        {totalItems} {totalItems === 1 ? "item" : "items"}
                    </Text>

                    {/* Empty cart */}
                    {cartItems.length === 0 ? (
                        <View className="mt-20 items-center">
                            <Ionicons
                                name="cart-outline"
                                size={60}
                                color="#9CA3AF"
                            />
                            <Text className="mt-4 text-xl font-bold">
                                Your cart is empty
                            </Text>

                            <TouchableOpacity
                                onPress={() => router.replace("/")}
                                className="mt-6 rounded-xl bg-[#004CFF] px-8 py-3"
                            >
                                <Text className="font-bold text-white">
                                    Shop Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            {/* Cart items */}
                            {cartItems.map((item) => (
                                <View
                                    key={`${item._id}-${item.color}-${item.size}`}
                                    className="mt-4 rounded-3xl bg-white p-4 shadow"
                                >
                                    <View className="flex-row">
                                        <Image
                                            source={{ uri: item.image }}
                                            className="h-24 w-24 rounded-xl"
                                        />

                                        <View className="ml-4 flex-1">
                                            <Text className="font-bold">
                                                {item.title}
                                            </Text>
                                            <Text className="text-gray-500">
                                                {item.color} | {item.size}
                                            </Text>

                                            <View className="mt-2 flex-row items-center justify-between">
                                                <Text className="font-bold text-blue-600">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </Text>

                                                {/* Quantity */}
                                                <View className="flex-row items-center rounded-xl bg-gray-100 p-1">
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            dispatch(
                                                                decreasedQty(
                                                                    item,
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="remove"
                                                            size={16}
                                                        />
                                                    </TouchableOpacity>

                                                    <Text className="mx-3 font-bold">
                                                        {item.quantity}
                                                    </Text>

                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            dispatch(
                                                                increasedQty(
                                                                    item,
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="add"
                                                            size={16}
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                {/* Remove */}
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        dispatch(
                                                            removeFromCart(
                                                                item,
                                                            ),
                                                        )
                                                    }
                                                >
                                                    <Ionicons
                                                        name="trash-outline"
                                                        size={20}
                                                        color="#EF4444"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}

                            {/* Summary */}
                            <View className="mt-6 rounded-3xl bg-white p-6 shadow">
                                <View className="mb-2 flex-row justify-between">
                                    <Text>Subtotal</Text>
                                    <Text className="font-bold">
                                        ${subtotal.toFixed(2)}
                                    </Text>
                                </View>

                                <View className="mb-4 flex-row justify-between">
                                    <Text>Shipping</Text>
                                    <Text className="font-bold">$15.00</Text>
                                </View>

                                <View className="mb-6 flex-row justify-between border-t pt-4">
                                    <Text className="text-xl font-bold">
                                        Total
                                    </Text>
                                    <Text className="text-xl font-bold text-blue-600">
                                        ${(subtotal + 15).toFixed(2)}
                                    </Text>
                                </View>

                                {/* Proceed to Checkout */}
                                <TouchableOpacity
                                    onPress={() => router.push("/checkout")}
                                    className="flex-row items-center justify-center gap-2 rounded-2xl bg-[#004CFF] py-4"
                                >
                                    <Text className="text-lg font-bold text-white">
                                        Proceed to Checkout
                                    </Text>
                                    <Ionicons
                                        name="arrow-forward"
                                        size={20}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
