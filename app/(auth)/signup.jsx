import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { signUp } from '../../src/store/slices/authSlice';

export default function CreateAccountScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    // handle signup
    const handleSignup = async () => {
        try {
            await dispatch(signUp({ email, password, metadata: { name } })).unwrap();
            router.push('/(tabs)');
        } catch (error) {
            Alert.alert(error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F5F5F7]">
            {/* Blue Circle bg */}
            <View className="absolute right-[-75px] top-20 h-64 w-64">
                <Image
                    source={{ uri: 'https://i.ibb.co/xSnrBmhY/bg-img2.png' }}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>

            {/* Top left bg */}
            <View className="absolute left-20 top-20 h-64 w-64">
                <Image
                    source={{ uri: 'https://i.ibb.co/xNSK0qg/bg-img1.png' }}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>

            {/* Main Content */}
            <View className="flex-1 px-5 pt-10">
                {/* Title */}
                <Text className="text-[48px] font-bold text-black leading-[56px] mb-10">Create{'\n'}Account</Text>

                {/* Camera Icon */}
                <View className="mb-10">
                    <Pressable>
                        <Image source={{ uri: 'https://i.ibb.co/R4sthN5h/upload-icon.png' }} className="w-24 h-24" />
                    </Pressable>
                </View>

                {/* Name Input */}
                <TextInput
                    className="bg-white rounded-xl px-5 py-4 text-base mb-4 shadow-sm"
                    placeholder="Enter your Full Name"
                    placeholderTextColor="#C7C7CD"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

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
                    onPress={handleSignup}>
                    <Text className="text-white text-lg font-semibold">Signup</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center justify-center gap-3 mt-8"
                    onPress={() => router.push('/(auth)/login')}>
                    <Text className="text-xl">I already have an account</Text>
                    <Feather name="arrow-right" size={18} color="white" className=" bg-blue-500 p-1 rounded-full" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
