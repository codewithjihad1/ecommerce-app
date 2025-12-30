import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const OrderDetails = ({ id }) => {
    const router = useRouter();
    const [order, setOrder] = useState({});
    const [items, setItems] = useState([]);
    // console.log(id);

    const handleGoBack = () => {
        router.back();
    };

    const fetchOrder = useCallback(async () => {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("order_id", id);
        // const { data, error } = await supabase
        //     .from("order_items")
        //     .select()

        if (error) {
            console.error("Error fetching orders:", error);
            return;
        }

        const { data: it, error: itError } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", id);

        if (itError) {
            console.error("Error fetching order items:", itError);
        }

        // console.log(data);
        setItems(it);
        setOrder(data);
    }, [id]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    if (!order || !items) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
                    activeOpacity={0.7}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>

                <Text className="text-2xl font-bold">
                    Order #{id.slice(id.length - 4)}
                </Text>

                <View className="w-10" />
            </View>

            <ScrollView>
                {/* Order status */}
                <View className="mx-5 mt-4 flex-row items-center justify-center gap-x-6 rounded-xl bg-[#575757] p-10">
                    <Text className="text-xl font-semibold text-white">
                        Your order is {order[0]?.payment_status}
                    </Text>
                    <SimpleLineIcons name="handbag" size={34} color="white" />
                </View>

                {/* Order information */}
                <View className="mx-5 mt-10 rounded-xl bg-white p-2 shadow-sm">
                    <View className="mb-4 flex-row justify-between">
                        <Text className="text-black/50">Order number</Text>
                        <Text className="">{id.slice(id.length - 4)}</Text>
                    </View>
                    <View className="mb-4 flex-row justify-between">
                        <Text className="text-black/50">Tracking number</Text>
                        <Text className="">
                            {order[0]?.trx_id?.slice(0, 10) || "N/A"}
                        </Text>
                    </View>
                    <View className="mb-4 flex-row justify-between">
                        <Text className="text-black/50">Delivery address</Text>
                        <Text className="">
                            {order[0]?.shipping_address?.address},{" "}
                            {order[0]?.shipping_address?.city}
                        </Text>
                    </View>
                </View>

                {/* Order items and total calculation */}
                {items.length > 0 && (
                    <View className="mx-5 mt-10 rounded-xl bg-white p-2 shadow-sm">
                        {items.map((items, i) => (
                            <View
                                className="mb-4 flex-row justify-between"
                                key={i}
                            >
                                <Text className="text-black/50">
                                    {items.product_name}
                                </Text>
                                <View className="flex-row gap-x-8">
                                    <Text>x{items.quantity}</Text>
                                    <Text>${items.subtotal}</Text>
                                </View>
                            </View>
                        ))}

                        <View className="mt-4">
                            <View className="mb-4 flex-row justify-between">
                                <Text className="text-black/50">Sub Total</Text>
                                <Text className="">{order[0]?.subtotal}</Text>
                            </View>

                            <View className="mb-4 flex-row justify-between">
                                <Text className="text-black/50">Shipping</Text>
                                <Text className="">
                                    {order[0]?.total - order[0]?.subtotal}
                                </Text>
                            </View>

                            <View className="mb-4 px-1">
                                <View className="border-[0.5px] border-black/50"></View>
                            </View>

                            <View className="mb-10 flex-row justify-between">
                                <Text className="text-black/50">Total</Text>
                                <Text className="">${order[0]?.total}</Text>
                            </View>
                        </View>
                    </View>
                )}

                <View className="mt-10 flex items-center">
                    <TouchableOpacity
                        className="rounded-full border border-[#777E90] px-6 py-3 flex-row gap-x-2 items-center"
                        onPress={() => router.push("/")}
                    >
                        <Ionicons name="home-outline" size={24} color="black" />
                        <Text>Return Home</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default OrderDetails;
