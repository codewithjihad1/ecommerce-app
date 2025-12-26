import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import About from "../../src/components/about/About";

const discover = () => {
    return (
        <SafeAreaView
            className="flex-1 bg-[#FFFFFF]"
        >
            <About />
        </SafeAreaView>
    );
};

export default discover;
