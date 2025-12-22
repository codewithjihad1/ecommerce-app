import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Discover from "../../src/components/discover/Discover";

const discover = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#FFFFFF]">
            <Discover />
        </SafeAreaView>
    );
};

export default discover;
