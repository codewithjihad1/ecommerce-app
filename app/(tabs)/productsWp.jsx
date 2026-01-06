import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../src/components/product/ProductCard";

export default function ProductsScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/products",
                );
                if (res?.data) setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="p-5">
                    <Text
                        variant="headlineMedium"
                        style={{ fontWeight: "700" }}
                    >
                        WooCommerce Products
                    </Text>
                </View>

                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={() =>
                                navigation.navigate("ProductDetails", {
                                    product: item,
                                })
                            }
                        />
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
