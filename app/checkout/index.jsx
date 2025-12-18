import { EvilIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cartData } from '../../assets/cartData/Data';

export default function Checkout() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(cartData);
    }, []);

    return (
        <SafeAreaView className="p-4">
            <View>
                <Text className="text-3xl font-bold">Payment</Text>
            </View>
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
                            <Text>$ {item.price}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}
