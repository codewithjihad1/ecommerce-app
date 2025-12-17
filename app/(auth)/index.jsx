import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../../src/store/slices/authSlice';

export default function AuthScreen() {
    const router = useRouter();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkSession());
    }, []);
    console.log('User data', user, 'authenticated', isAuthenticated);

    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <View className="w-24 h-24 p-5 bg-slate-50 mb-6 rounded-full">
                <Image source={{ uri: 'https://i.ibb.co/jPYj3TLJ/shoping-icon.png' }} className="w-full h-full" />
            </View>
            <View className="flex-col items-center w-3/5 mb-16">
                <Text className="font-bold text-6xl mb-4 text-center">Shoppe</Text>
                <Text className="text-center text-xl leading-8">Beautiful eCommerce UI Kit for your online store</Text>
            </View>
            <View>
                <Pressable onPress={() => router.push('/signup')}>
                    <Text className="w-full py-3 px-6 bg-primary rounded-xl text-center text-white text-xl">
                        {"Let's get started"}
                    </Text>
                </Pressable>
                <TouchableOpacity className="flex-row items-center gap-3 mt-8" onPress={() => router.push('/login')}>
                    <Text className="text-xl">I already have an account</Text>
                    <Feather name="arrow-right" size={18} color="white" className=" bg-blue-500 p-1 rounded-full" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
