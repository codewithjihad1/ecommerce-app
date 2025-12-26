import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Support from "../../src/components/support/Support";
// import { ScrollView } from "react-native";

const SupportPage = () => {
    return (
        <SafeAreaView
            // contentInsetAdjustmentBehavior="automatic"
            // showsVerticalScrollIndicator="false"
            className="flex-1 bg-[#FFFFFF]"
        >
            <Support />
        </SafeAreaView>
    );
};

export default SupportPage;
