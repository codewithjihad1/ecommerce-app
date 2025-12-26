import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Orders from "../../src/components/orders/Orders";
// import { ScrollView } from "react-native";

const orderPage = () => {
    return (
        <SafeAreaView
            // contentInsetAdjustmentBehavior="automatic"
            // showsVerticalScrollIndicator="false"
            className="flex-1 bg-[#FFFFFF]"
        >
            <Orders />
        </SafeAreaView>
    );
};

export default orderPage;