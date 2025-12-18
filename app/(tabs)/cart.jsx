import { Ionicons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cartData } from "../../assets/cartData/Data";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const router = useRouter();

  useEffect(() => {
    setProducts(cartData);
    // Initialize quantities
    const initialQuantities = {};
    cartData.forEach((product, index) => {
      initialQuantities[index] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const updateQuantity = (index, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) + delta),
    }));
  };

  const removeProduct = (index) => {
  setProducts((prev) => prev.filter((_, i) => i !== index));
  setQuantities((prev) => {
    const newQuantities = {};
    Object.keys(prev).forEach((key) => {
      const oldIndex = parseInt(key);
      if (oldIndex !== index) {
        newQuantities[oldIndex < index ? oldIndex : oldIndex - 1] = prev[key];
      }
    });
    return newQuantities;
  });
};

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const subtotal = products.reduce((sum, product, index) => sum + product.price * (quantities[index] || 1), 0);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mx-5 py-5">
          {/* Header with Gradient Badge */}
          <View className="flex-row items-center gap-4 mb-6">
            <View className="flex-1">
              <Text style={{ fontFamily: "RalewayBold" }} className="text-4xl text-gray-900">
                Cart
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </Text>
            </View>
          </View>

          {/* Address Section with Enhanced Design */}
          <View className="mb-6 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <View className="px-5 py-5">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-3">
                  <View className="bg-blue-100 rounded-xl p-2">
                    <Ionicons name="location" size={20} color="#2563EB" />
                  </View>
                  <Text style={{ fontFamily: "RalewayBold" }} className="text-xl text-gray-900">
                    Shipping Address
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3 shadow-md"
                  activeOpacity={0.8}>
                  <Octicons name="pencil" size={18} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={{ fontFamily: "Poppins" }} className="text-gray-600 leading-6 pl-11">
                26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city
              </Text>
            </View>
          </View>

          {/* Cart Products with Beautiful Cards */}
          <View className="mb-6">
            {products.length === 0 ? (
              <View className="bg-white rounded-3xl p-12 items-center shadow-lg">
                <View className="bg-gray-100 rounded-full p-8 mb-4">
                  <Ionicons name="cart-outline" size={48} color="#9CA3AF" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "RalewayBold" }}>
                  Your cart is empty
                </Text>
                <Text className="text-gray-500 text-center">Add some products to get started!</Text>
                <TouchableOpacity onPress={() => router.replace("/")}>
                  <Text className="bg-[#004CFF] px-5 py-3 mt-5 text-white rounded ">Shop Now</Text>
                </TouchableOpacity>
              </View>
            ) : (
              products.map((product, index) => (
                <View
                  key={index}
                  className="bg-white rounded-3xl mb-4 shadow-lg border border-gray-100 overflow-hidden">
                  <View className="flex-row p-5">
                    {/* Product Image with Gradient Background */}
                    <View className="mr-4">
                      <View className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-md">
                        <Image source={product.img} className="w-32 h-32" resizeMode="cover" />
                      </View>
                    </View>

                    {/* Product Details */}
                    <View className="flex-1 justify-between py-1">
                      <View>
                        <Text
                          className="text-base font-bold text-gray-900 mb-3"
                          numberOfLines={2}
                          style={{ fontFamily: "RalewayBold" }}>
                          {product.description}
                        </Text>
                        <View className="flex-row gap-2 mb-4">
                          <View className="bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl">
                            <Text className="text-xs font-semibold text-blue-700">Size: {product.size}</Text>
                          </View>
                          <View className="bg-purple-50 border border-purple-200 px-3 py-2 rounded-xl">
                            <Text className="text-xs font-semibold text-purple-700">{product.color}</Text>
                          </View>
                        </View>
                      </View>

                      <View className="flex-row items-center justify-between">
                        {/* Price with Gradient Text Effect */}
                        <Text className="text-2xl font-bold text-blue-600" style={{ fontFamily: "RalewayBold" }}>
                          ${(product.price * (quantities[index] || 1)).toFixed(2)}
                        </Text>

                        {/* Quantity Controls */}
                        <View className="flex-row items-center bg-gray-100 rounded-2xl p-1">
                          <TouchableOpacity
                            onPress={() => updateQuantity(index, -1)}
                            className="bg-white rounded-xl w-9 h-9 items-center justify-center shadow-sm"
                            activeOpacity={0.7}>
                            <Ionicons name="remove" size={18} color="#4B5563" />
                          </TouchableOpacity>
                          <Text className="text-base font-bold text-gray-900 mx-4 min-w-[20px] text-center">
                            {quantities[index] || 1}
                          </Text>
                          <TouchableOpacity
                            onPress={() => updateQuantity(index, 1)}
                            className="bg-blue-600 rounded-xl w-9 h-9 items-center justify-center shadow-sm"
                            activeOpacity={0.7}>
                            <Ionicons name="add" size={18} color="white" />
                          </TouchableOpacity>
                        </View>

                        {/* Delete Button */}
                        <TouchableOpacity
                          onPress={() => removeProduct(index)}
                          className="bg-red-50 border border-red-200 p-2.5 rounded-xl ml-2"
                          activeOpacity={0.7}>
                          <Ionicons name="trash-outline" size={18} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Order Summary Card */}
          {products.length > 0 && (
            <View className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "RalewayBold" }}>
                Order Summary
              </Text>

              <View className="space-y-3 mb-4">
                <View className="flex-row justify-between items-center py-2">
                  <Text className="text-gray-600" style={{ fontFamily: "Poppins" }}>
                    Subtotal
                  </Text>
                  <Text className="text-lg font-semibold text-gray-900">${subtotal.toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between items-center py-2">
                  <Text className="text-gray-600" style={{ fontFamily: "Poppins" }}>
                    Shipping
                  </Text>
                  <Text className="text-lg font-semibold text-gray-900">$15.00</Text>
                </View>
                <View className="border-t border-gray-200 pt-3 mt-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-bold text-gray-900" style={{ fontFamily: "RalewayBold" }}>
                      Total
                    </Text>
                    <Text className="text-3xl font-bold text-blue-600" style={{ fontFamily: "RalewayBold" }}>
                      ${(subtotal + 15).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity className="py-4 items-center shadow-lg mt-2" activeOpacity={0.8}>
                <View className="flex-row items-center gap-2 bg-[#004CFF] rounded-lg px-10 py-4">
                  <Text
                  onPress={()=>router.push('/checkout')}
                    className="text-lg font-bold  text-white "
                    style={{ fontFamily: "RalewayBold" }}>
                    Proceed to Checkout
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
