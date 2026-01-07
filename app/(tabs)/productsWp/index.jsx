import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../../src/components/product/ProductCard";

export default function ProductsScreen() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/products",
                );
                if (data) setProducts(data.products);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading && products.length <= 0) {
        return <ActivityIndicator size={"large"} />;
    }

    return (
        <SafeAreaView>
            <View className="p-5">
                <Text variant="headlineMedium" style={{ fontWeight: "700" }}>
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
                        onPress={() => router.push(`/productsWp/${item.id}`)}
                    />
                )}
            />
        </SafeAreaView>
    );
}
