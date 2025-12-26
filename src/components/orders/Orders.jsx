import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { supabase } from "../../lib/supabase";

const myOrders = [
    {
        order_id: 1001,
        date: "06/12/2025",
        tracking_no: "TRK158002",
        quantity: 3,
        subtotal: 129.99,
        order_status: "Delivered",
    },
    {
        order_id: 1002,
        date: "10/12/2025",
        tracking_no: "TRK246977",
        quantity: 1,
        subtotal: 89.5,
        order_status: "Delivered",
    },
    {
        order_id: 1003,
        date: "15/12/2025",
        tracking_no: "TRK158003",
        quantity: 5,
        subtotal: 215.75,
        order_status: "Pending",
    },
    {
        order_id: 1004,
        date: "20/12/2025",
        tracking_no: "TRK158004",
        quantity: 2,
        subtotal: 45.0,
        order_status: "Cancelled",
    },
    {
        order_id: 1005,
        date: "24/12/2025",
        tracking_no: "TRK548962",
        quantity: 4,
        subtotal: 320.4,
        order_status: "Pending",
    },
    {
        order_id: 1006,
        date: "26/12/2025",
        tracking_no: "TRK158005",
        quantity: 7,
        subtotal: 189.25,
        order_status: "Delivered",
    },
];

const Orders = () => {
    const router = useRouter();
    const { user, loading } = useSelector((state) => state.auth);
    const [status, setStatus] = useState("Pending");
    const [orders, setOrders] = useState([]);

    const handleGoBack = () => {
        router.back();
    };

    const fetchOrders = useCallback(async () => {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.id);

        if (error) {
            console.error("Error fetching orders:", error);
            return;
        }

        setOrders(data);
    }, [user]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleStatus = (currentStatus) => {
        setStatus(currentStatus);
        const filteredOrders = orders.filter(
            (order) => order.order_status === currentStatus,
        );
        setOrders(filteredOrders);
    };

    if (loading && !user) {
        return <ActivityIndicator size="large" />;
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

                <Text className="text-2xl font-bold">My Orders</Text>

                <View className="w-10" />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                {/* Order Status */}
                <View className="mt-4 flex-row justify-around">
                    <Pressable onPress={() => handleStatus("Pending")}>
                        <Text
                            className={`rounded-full px-6 py-2 ${status === "Pending" ? "bg-[#43484B] text-white" : "bg-white text-black"}`}
                        >
                            Pending
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => handleStatus("Delivered")}>
                        <Text
                            className={`rounded-full px-6 py-2 ${status === "Delivered" ? "bg-[#43484B] text-white" : "bg-white text-black"}`}
                        >
                            Delivered
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => handleStatus("Cancelled")}>
                        <Text
                            className={`rounded-full px-6 py-2 ${status === "Cancelled" ? "bg-[#43484B] text-white" : "bg-white text-black"}`}
                        >
                            Cancelled
                        </Text>
                    </Pressable>
                </View>

                {/* Order Card */}
                <View className="mx-5 mt-8">
                    {orders.map((order, i) => (
                        <View
                            key={i}
                            className="mb-4 rounded-xl bg-white p-4 shadow-sm"
                        >
                            <View className="flex-row items-center justify-between">
                                <Text className="text-xl font-semibold">
                                    Order #{order.order_id}
                                </Text>
                                <Text className="text-black/50">
                                    {order.date}
                                </Text>
                            </View>

                            <View className="mt-6 flex-row items-center">
                                <Text className="mr-2 text-black/50">
                                    Tracking Number:{" "}
                                </Text>
                                <Text className="font-medium">
                                    {order.tracking_no}
                                </Text>
                            </View>

                            <View className="mt-6 flex-row items-center justify-between">
                                <View className="flex-row">
                                    <Text className="mr-2 text-black/50">
                                        Quanlity:{" "}
                                    </Text>
                                    <Text className="font-medium">
                                        {order.quantity}
                                    </Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="mr-2 text-black/50">
                                        Subtotal:{" "}
                                    </Text>
                                    <Text className="font-medium">
                                        ${order.subtotal}
                                    </Text>
                                </View>
                            </View>

                            <View className="mt-6 flex-row items-center justify-between">
                                <Text
                                    className={`${order.order_status === "Pending" ? "text-[#CF6212]" : order.order_status === "Delivered" ? "text-[#009254]" : "text-[#C50000]"} text-xl font-medium`}
                                >
                                    {order.order_status}
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push(`/orders/${order.order_id}`)
                                    }
                                >
                                    <Text className="rounded-full border px-6 py-3">
                                        Details
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Orders;
