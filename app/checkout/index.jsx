import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cartData } from '../../assets/cartData/Data';
import ShippingOptions from '../../src/components/checkout/ShippingOptions';

export default function Checkout() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(cartData);
    }, []);

    return (
        <SafeAreaView className="p-4 flex-1 justify-center">
            <View>
                <Text className="text-3xl font-bold">Payment</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Shipping Address */}
                <View className="flex-row items-center justify-between overflow-hidden gap-4 bg-slate-200 p-4 rounded-lg mt-5">
                    <View className="flex-1">
                        <Text className="text-lg font-bold">Shipping Address</Text>
                        <Text className="text-base">
                            26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city
                        </Text>
                    </View>
                    <View className="rounded-full bg-primary text-white w-10 h-10 flex-row items-center justify-center">
                        <EvilIcons name="pencil" size={28} color="white" />
                    </View>
                </View>
                {/* Contact Info */}
                <View className="flex-row items-center justify-between overflow-hidden gap-4 bg-slate-200 p-4 rounded-lg mt-3">
                    <View className="flex-1">
                        <Text className="text-lg font-bold">Contact Information</Text>
                        <Text className="text-base">+84932000000</Text>
                        <Text className="text-base">amandamorgan@example.com</Text>
                    </View>
                    <View className="rounded-full bg-primary text-white w-10 h-10 flex-row items-center justify-center">
                        <EvilIcons name="pencil" size={28} color="white" />
                    </View>
                </View>

                {/* Cart items */}
                <View className="mt-4">
                    <View className="mb-4 flex-row justify-between items-center flex-wrap">
                        <Text className="text-3xl font-bold ">Items </Text>
                        <Button mode="outlined" textColor="blue" style={{ borderColor: 'blue' }}>
                            Apply Voucher
                        </Button>
                    </View>
                    <View className="">
                        {products?.map((item, index) => (
                            <View
                                key={index}
                                className="flex-row items-center justify-between p-3 bg-gray-200 mb-2 rounded-xl">
                                <Image source={{ uri: item?.img }} className="w-12 h-12 rounded-full border-[3px]" />
                                <Text>{item.title}</Text>
                                <Text className="text-xl font-bold ">$ {item.price}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Shipping method */}
                <View>
                    <Text className="text-3xl font-bold my-3">Shipping Options</Text>

                    <ShippingOptions />
                </View>

                {/* Payment method */}
                <View className="px-4 py-3 flex-row items-center justify-between">
                    {/* Left */}
                    <View>
                        <Text className="text-lg font-semibold text-gray-900 mb-2">Payment Method</Text>

                        <View className="bg-indigo-50 px-4 py-2 rounded-full self-start">
                            <Text className="text-indigo-600 font-semibold text-base">Card</Text>
                        </View>
                    </View>

                    {/* Edit button */}
                    <Pressable className="h-12 w-12 rounded-full bg-blue-600 items-center justify-center">
                        <FontAwesome name="pencil" size={18} color="white" />
                    </Pressable>
                </View>
            </ScrollView>

            {/* Total amount */}
            <View className="px-4 py-4 flex-row items-center justify-between bg-white border-t border-gray-200 rounded-xl shadow-current">
                <Text className="text-xl font-semibold text-gray-900">
                    Total <Text className="font-bold">$34.00</Text>
                </Text>

                <Pressable
                    onPress={() => console.log('Pay')}
                    className="bg-neutral-900 px-10 py-4 rounded-2xl active:opacity-80">
                    <Text className="text-white text-lg font-semibold">Pay</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
