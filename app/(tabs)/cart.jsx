import { Ionicons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSanityProducts } from "../../src/components/hooks/useSanityProducts";

export default function Cart() {
  const { products: sanityProducts, loading } = useSanityProducts();

  // Local state for the cart items (so we can remove/edit)
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const router = useRouter();

  // Sync sanity products to local state once loaded
  useEffect(() => {
    if (sanityProducts && sanityProducts.length > 0) {
      setProducts(sanityProducts);

      // Initialize quantities: { "product_id_1": 1, "product_id_2": 1 }
      const initialQuantities = {};
      sanityProducts.forEach((product) => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [sanityProducts]);

  const updateQuantity = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
    setQuantities((prev) => {
      const newQtys = { ...prev };
      delete newQtys[id];
      return newQtys;
    });
  };

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const subtotal = products.reduce((sum, product) => {
    return sum + product.price * (quantities[product._id] || 1);
  }, 0);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#004CFF" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mx-5 py-5">
          {/* Header */}
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

          {/* Address Section */}
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
                <TouchableOpacity className="bg-blue-600 rounded-full p-3 shadow-md">
                  <Octicons name="pencil" size={18} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={{ fontFamily: "Poppins" }} className="text-gray-600 leading-6 pl-11">
                26, Duong So 2, Thao Dien Ward, District 2, HCMC
              </Text>
            </View>
          </View>

          {/* Cart Products */}
          <View className="mb-6">
            {products.length === 0 ? (
              <View className="bg-white rounded-3xl p-12 items-center shadow-lg">
                <View className="bg-gray-100 rounded-full p-8 mb-4">
                  <Ionicons name="cart-outline" size={48} color="#9CA3AF" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "RalewayBold" }}>
                  Your cart is empty
                </Text>
                <TouchableOpacity onPress={() => router.replace("/")}>
                  <Text className="bg-[#004CFF] px-8 py-3 mt-5 text-white rounded-xl font-bold">Shop Now</Text>
                </TouchableOpacity>
              </View>
            ) : (
              products.map((product) => (
                <View
                  key={product._id}
                  className="bg-white rounded-3xl mb-4 shadow-lg border border-gray-100 overflow-hidden">
                  <View className="flex-row p-5">
                    <View className="mr-4">
                      <View className="bg-gray-100 rounded-2xl overflow-hidden">
                        {/* Fixed Image Logic */}
                        <Image source={{ uri: product.image }} className="w-24 h-24" resizeMode="cover" />
                      </View>
                    </View>

                    <View className="flex-1 justify-between">
                      <View>
                        <Text
                          className="text-base font-bold text-gray-900"
                          numberOfLines={1}
                          style={{ fontFamily: "RalewayBold" }}>
                          {product.title}
                        </Text>
                        <Text className="text-gray-500 text-xs mb-2" numberOfLines={1}>
                          {product.description}
                        </Text>
                      </View>

                      <View className="flex-row items-center justify-between">
                        <Text className="text-xl font-bold text-blue-600">
                          ${(product.price * (quantities[product._id] || 1)).toFixed(2)}
                        </Text>

                        <View className="flex-row items-center bg-gray-100 rounded-xl p-1">
                          <TouchableOpacity
                            onPress={() => updateQuantity(product._id, -1)}
                            className="bg-white rounded-lg p-1">
                            <Ionicons name="remove" size={16} color="black" />
                          </TouchableOpacity>
                          <Text className="mx-3 font-bold">{quantities[product._id] || 1}</Text>
                          <TouchableOpacity
                            onPress={() => updateQuantity(product._id, 1)}
                            className="bg-blue-600 rounded-lg p-1">
                            <Ionicons name="add" size={16} color="white" />
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => removeProduct(product._id)} className="ml-2">
                          <Ionicons name="trash-outline" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Summary */}
          {products.length > 0 && (
            <View className="bg-white rounded-3xl shadow-lg p-6 mb-6">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Subtotal</Text>
                <Text className="font-bold">${subtotal.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between mb-4">
                <Text className="text-gray-600">Shipping</Text>
                <Text className="font-bold">$15.00</Text>
              </View>
              <View className="border-t border-gray-100 pt-4 flex-row justify-between items-center">
                <Text className="text-xl font-bold">Total</Text>
                <Text className="text-2xl font-bold text-blue-600">${(subtotal + 15).toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/checkout")}
                className="bg-[#004CFF] rounded-2xl py-4 mt-6 items-center flex-row justify-center gap-2">
                <Text className="text-white font-bold text-lg">Checkout</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
