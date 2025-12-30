import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import { supabase } from "../../lib/supabase";
import * as Progress from "react-native-progress";

// const myOrders = [
//     {
//         order_id: 1001,
//         date: "06/12/2025",
//         tracking_no: "TRK158002",
//         quantity: 3,
//         subtotal: 129.99,
//         order_status: "Delivered",
//     },
//     {
//         order_id: 1002,
//         date: "10/12/2025",
//         tracking_no: "TRK246977",
//         quantity: 1,
//         subtotal: 89.5,
//         order_status: "Delivered",
//     },
//     {
//         order_id: 1003,
//         date: "15/12/2025",
//         tracking_no: "TRK158003",
//         quantity: 5,
//         subtotal: 215.75,
//         order_status: "Pending",
//     },
//     {
//         order_id: 1004,
//         date: "20/12/2025",
//         tracking_no: "TRK158004",
//         quantity: 2,
//         subtotal: 45.0,
//         order_status: "Cancelled",
//     },
//     {
//         order_id: 1005,
//         date: "24/12/2025",
//         tracking_no: "TRK548962",
//         quantity: 4,
//         subtotal: 320.4,
//         order_status: "Pending",
//     },
//     {
//         order_id: 1006,
//         date: "26/12/2025",
//         tracking_no: "TRK158005",
//         quantity: 7,
//         subtotal: 189.25,
//         order_status: "Delivered",
//     },
// ];

const orderStatus = [
    { id: "1", os: "All" },
    { id: "2", os: "Pending" },
    { id: "3", os: "Paid" },
    { id: "4", os: "Delivered" },
    { id: "5", os: "Cancelled" },
];

const Orders = () => {
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const [status, setStatus] = useState("All");
    const [orders, setOrders] = useState([]);
    const [filterOrders, setFilterOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleGoBack = () => {
        router.back();
    };

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });
        // const { data, error } = await supabase
        //     .from("order_items")
        //     .select()

        if (error) {
            console.error("Error fetching orders:", error);
            return;
        }

        if (!data || data.length === 0) {
            setOrders([]);
            setFilterOrders([]);
            return;
        }

        const orderIds = data.map((o) => o.order_id);
        const { data: items, error: itemsError } = await supabase
            .from("order_items")
            .select("order_id, quantity")
            .in("order_id", orderIds);

        if (itemsError) {
            console.error("Error fetching order items:", itemsError);
        }

        const qtyMap = {};
        (items || []).forEach((o) => {
            qtyMap[o.order_id] = (qtyMap[o.order_id] || 0) + o.quantity;
        });

        const ordersWithQty = data.map((o) => ({
            ...o,
            totalQuantity: qtyMap[o.order_id],
        }));

        setOrders(ordersWithQty);
        setFilterOrders(ordersWithQty);

        setTimeout(() => setLoading(false), 3000);
    }, [user]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleStatus = (currentStatus) => {
        setStatus(currentStatus);
        if (currentStatus === "All") {
            setFilterOrders(orders);
            return;
        }
        const filteredOrders = orders.filter(
            (order) =>
                order.payment_status.toLowerCase() ===
                currentStatus.toLowerCase(),
        );
        setFilterOrders(filteredOrders);
    };

    useEffect(() => {
        if (!loading) {
            setProgress(1);
            return;
        }

        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 0.95) {
                    clearInterval(interval);
                    setLoading(false);
                    return 0.95;
                }
                return prev + 0.3;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [loading]);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Progress.Bar progress={progress} width={200} />
            </View>
        );
    }

    // if (filterOrders.length === 0) {
    //     return (
    //         <View className="flex-1 items-center justify-center bg-white">
    //             <Text>No orders place yet</Text>
    //         </View>
    //     );
    // }

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
                <View className="mx-5 mt-4">
                    <FlatList
                        data={orderStatus}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handleStatus(item.os)}>
                                <Text
                                    className={`rounded-full px-6 py-2 ${status === item.os ? "bg-[#43484B] text-white" : "bg-white text-black"}`}
                                >
                                    {item.os}
                                </Text>
                            </Pressable>
                        )}
                    ></FlatList>
                    {/* <Pressable onPress={() => handleStatus("All")}>
                        <Text
                            className={`rounded-full px-6 py-2 ${status === "All" ? "bg-[#43484B] text-white" : "bg-white text-black"}`}
                        >
                            All
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => handleStatus("pending")}>
                        <Text
                            className={`rounded-full px-6 py-2 ${status === "pending" ? "bg-[#43484B] text-white" : "bg-white text-black"}`}
                        >
                            Pending
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => handleStatus("paid")}>
                        <Text
                            className={`rounded-full px-6 py-2 ${status === "paid" ? "bg-[#43484B] text-white" : "bg-white text-black"}`}
                        >
                            Paid
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => handleStatus("delivered")}>
                        <Text
                            className={`rounded-full px-6 py-2 ${status === "delivered" ? "bg-[#43484B] text-white" : "bg-white text-black"}`}
                        >
                            Delivered
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => handleStatus("cancelled")}>
                        <Text
                            className={`rounded-full px-6 py-2 ${status === "cancelled" ? "bg-[#43484B] text-white" : "bg-white text-black"}`}
                        >
                            Cancelled
                        </Text>
                    </Pressable> */}
                </View>

                {/* Order Card */}
                <View className="mx-5 mt-8">
                    {filterOrders.length === 0 ? (
                        <View className="items-center justify-center">
                            <Text>No Orders Place Yet</Text>
                        </View>
                    ) : (
                        filterOrders.map((order, i) => (
                            <View
                                key={i}
                                className="mb-4 rounded-xl bg-white p-4 shadow-sm"
                            >
                                <View className="flex-row flex-wrap items-center justify-between gap-3">
                                    <Text className="text-xl font-semibold">
                                        Order #
                                        {order.order_id.slice(
                                            order.order_id.length - 4,
                                        )}
                                    </Text>
                                    <Text className="text-black/50">
                                        {new Date(
                                            order.created_at,
                                        ).toLocaleDateString()}
                                    </Text>
                                </View>

                                <View className="mt-6 flex-row items-center">
                                    <Text className="mr-2 text-black/50">
                                        Tracking Number:{" "}
                                    </Text>
                                    <Text className="font-medium">
                                        {order?.trx_id?.slice(
                                            order?.trx_id.length - 4,
                                        )}
                                    </Text>
                                </View>

                                <View className="mt-6 flex-row items-center justify-between">
                                    <View className="flex-row">
                                        <Text className="mr-2 text-black/50">
                                            Quanlity:{" "}
                                        </Text>
                                        <Text className="font-medium">
                                            {order.totalQuantity ?? 0}
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
                                        className={`${order.payment_status === "Pending" ? "text-[#CF6212]" : order.payment_status === "Delivered" ? "text-[#009254]" : "text-[#C50000]"} text-xl font-medium`}
                                    >
                                        {order.payment_status
                                            .charAt(0)
                                            .toUpperCase() +
                                            order.payment_status.slice(1)}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            router.push(
                                                `/orders/${order.order_id}`,
                                            )
                                        }
                                    >
                                        <Text className="rounded-full border px-6 py-3">
                                            Details
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Orders;
