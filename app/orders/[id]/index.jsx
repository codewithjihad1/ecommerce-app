import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderDetails from "../../../src/components/orders/OrderDetails";
// import Orders from "../../src/components/orders/Orders";
// import { ScrollView } from "react-native";

const OrdersPage = () => {
    const { id } = useLocalSearchParams();
    return (
        <SafeAreaView className="flex-1 bg-[#FFFFFF]">
            <OrderDetails id={id} />
        </SafeAreaView>
    );
};

export default OrdersPage;
