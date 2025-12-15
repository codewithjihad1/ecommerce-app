import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  return (
    <SafeAreaView className="m-5">
      <Text style={{ fontFamily: "Raleway" }} className="text-4xl font-semibold ">
        Wishlist
      </Text>
      <View className='flex-row items-center justify-between mt-4'>
        <Text className='text-2xl' style={{fontFamily:'Raleway'}}>Recently viewed</Text>
        <Ionicons name="arrow-forward" size={24} color="white" className='bg-blue-700 p-2 rounded-full' />
      </View>
    </SafeAreaView>
  );
}
