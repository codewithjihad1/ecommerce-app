import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import ShippingOptions from "../../src/components/checkout/ShippingOptions";

export default function Checkout() {
    const { items: products } = useSelector((state) => state.cart);

    console.log("prodidkjf kldj", products);
    return (
        <SafeAreaView className="flex-1 justify-center p-4">
            <View>
                <Text className="text-3xl font-bold">Payment</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Shipping Address */}
                <View className="mt-5 flex-row items-center justify-between gap-4 overflow-hidden rounded-lg bg-slate-200 p-4">
                    <View className="flex-1">
                        <Text className="text-lg font-bold">
                            Shipping Address
                        </Text>
                        <Text className="text-base">
                            26, Duong So 2, Thao Dien Ward, An Phu, District 2,
                            Ho Chi Minh city
                        </Text>
                    </View>
                    <View className="h-10 w-10 flex-row items-center justify-center rounded-full bg-primary text-white">
                        <EvilIcons name="pencil" size={28} color="white" />
                    </View>
                </View>
                {/* Contact Info */}
                <View className="mt-3 flex-row items-center justify-between gap-4 overflow-hidden rounded-lg bg-slate-200 p-4">
                    <View className="flex-1">
                        <Text className="text-lg font-bold">
                            Contact Information
                        </Text>
                        <Text className="text-base">+84932000000</Text>
                        <Text className="text-base">
                            amandamorgan@example.com
                        </Text>
                    </View>
                    <View className="h-10 w-10 flex-row items-center justify-center rounded-full bg-primary text-white">
                        <EvilIcons name="pencil" size={28} color="white" />
                    </View>
                </View>

                {/* Cart items */}
                <View className="mt-4">
                    <View className="mb-4 flex-row flex-wrap items-center justify-between">
                        <Text className="text-3xl font-bold">Items </Text>
                        <Button
                            mode="outlined"
                            textColor="blue"
                            style={{ borderColor: "blue" }}
                        >
                            Apply Voucher
                        </Button>
                    </View>
                    <View className="">
                        {products?.map((item, index) => (
                            <View
                                key={index}
                                className="mb-2 flex-row items-center justify-between rounded-xl bg-gray-200 p-3"
                            >
                                <Image
                                    source={{ uri: item?.image }}
                                    className="h-12 w-12 rounded-full border-2 border-gray-300"
                                />
                                <Text>{item.title}</Text>
                                <Text className="text-xl font-bold">
                                    $ {item.price}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Shipping method */}
                <View>
                    <Text className="my-3 text-3xl font-bold">
                        Shipping Options
                    </Text>

                    <ShippingOptions />
                </View>

                {/* Payment method */}
                <View className="flex-row items-center justify-between px-4 py-3">
                    {/* Left */}
                    <View>
                        <Text className="mb-2 text-lg font-semibold text-gray-900">
                            Payment Method
                        </Text>

                        <View className="self-start rounded-full bg-indigo-50 px-4 py-2">
                            <Text className="text-base font-semibold text-indigo-600">
                                Card
                            </Text>
                        </View>
                    </View>

                    {/* Edit button */}
                    <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                        <FontAwesome name="pencil" size={18} color="white" />
                    </Pressable>
                </View>
            </ScrollView>

            {/* Total amount */}
            <View className="flex-row items-center justify-between rounded-xl border-t border-gray-200 bg-white px-4 py-4 shadow-current">
                <Text className="text-xl font-semibold text-gray-900">
                    Total <Text className="font-bold">$34.00</Text>
                </Text>

                <Pressable
                    onPress={() => console.log("Pay")}
                    className="rounded-2xl bg-neutral-900 px-10 py-4 active:opacity-80"
                >
                    <Text className="text-lg font-semibold text-white">
                        Pay
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
