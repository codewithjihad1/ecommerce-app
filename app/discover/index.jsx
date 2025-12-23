import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Discover from "../../src/components/discover/Discover";
// import { ScrollView } from "react-native";

const discover = () => {
    return (
        <SafeAreaView
            // contentInsetAdjustmentBehavior="automatic"
            // showsVerticalScrollIndicator="false"
            className="flex-1 bg-[#FFFFFF]"
        >
            <Discover />
        </SafeAreaView>
    );
};

export default discover;
