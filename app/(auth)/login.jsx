import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { signIn } from '../../src/store/slices/authSlice';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    //  handle Login
    const handleLogin = async () => {
        try {
            await dispatch(signIn({ email, password }));
            router.push('/(tabs)/index');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center">
            <View className="absolute w-4/5 h-64 -left-16 top-0">
                <Image
                    source={{ uri: 'https://i.ibb.co.com/XrYwY35Y/bubble-02.png' }}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>

            {/* Main Content */}
            <View className="flex-1 justify-center px-5 pt-10">
                {/* Title */}
                <Text className="text-[48px] font-bold text-black leading-[56px] mb-10">Login</Text>

                {/* Email input */}
                <TextInput
                    className="bg-white rounded-xl px-5 py-4 text-base mb-4 shadow-sm"
                    placeholder="Email"
                    placeholderTextColor="#C7C7CD"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                {/* Password Input */}
                <View className="flex-row items-center bg-white rounded-xl px-5 py-4 mb-4 shadow-sm">
                    <TextInput
                        className="flex-1 text-base"
                        placeholder="Password"
                        placeholderTextColor="#C7C7CD"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text className="text-lg">
                            {!showPassword ? (
                                <Ionicons name="eye" size={24} color="black" />
                            ) : (
                                <Ionicons name="eye-off" size={24} color="black" />
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Done Button */}
                <TouchableOpacity
                    className="bg-[#0066FF] rounded-xl py-4 items-center mb-4 shadow-lg"
                    onPress={handleLogin}>
                    <Text className="text-white text-lg font-semibold">Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center justify-center gap-3 mt-8"
                    onPress={() => router.push('/(auth)/signup')}>
                    <Text className="text-xl">{"I don't have any account. "}</Text>
                    <Feather name="arrow-right" size={18} color="white" className=" bg-blue-500 p-1 rounded-full" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
