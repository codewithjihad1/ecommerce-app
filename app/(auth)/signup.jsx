import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { signUp } from "../../src/store/slices/authSlice";

export default function CreateAccountScreen() {
  const [imgUri, setImgUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // console.log(imgUri, 'img uri');
  // handle signup
  const handleSignup = async () => {
    if (!imgUri) return;

    try {
      await dispatch(
        signUp({ email, password, metadata: { name, avatar: imgUri } }),
      ).unwrap();
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert(error);
    }
  };

  // pick image
  const pickImage = async () => {
    setLoading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permission to upload images.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    const formData = new FormData();
    formData.append("image", {
      uri: uri,
      name: "upload.jpg",
      type: "image/jpeg",
    });

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.EXPO_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );
    const text = await response.text();
    const { data } = JSON.parse(text);
    if (data?.url) setImgUri(data.url);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F7]">
      {/* Blue Circle bg */}
      <View className="absolute right-[-75px] top-20 h-64 w-64">
        <Image
          source={{ uri: "https://i.ibb.co/xSnrBmhY/bg-img2.png" }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Top left bg */}
      <View className="absolute left-20 top-20 h-64 w-64">
        <Image
          source={{ uri: "https://i.ibb.co/xNSK0qg/bg-img1.png" }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Main Content */}
      <View className="flex-1 px-5 pt-10">
        {/* Title */}
        <Text className="text-[48px] font-bold text-black leading-[56px] mb-10">
          Create{"\n"}Account
        </Text>

        {/* Camera Icon */}
        <View className="mb-10">
          <Pressable onPress={pickImage} disabled={loading}>
            {imgUri ? (
              <Image
                source={{ uri: imgUri }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <Image
                source={{ uri: "https://i.ibb.co/R4sthN5h/upload-icon.png" }}
                className="w-24 h-24 rounded-full"
              />
            )}
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
          onPress={handleSignup}
        >
          <Text className="text-white text-lg font-semibold">Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-center gap-3 mt-8"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-xl">I already have an account</Text>
          <Feather
            name="arrow-right"
            size={18}
            color="white"
            className=" bg-blue-500 p-1 rounded-full"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
