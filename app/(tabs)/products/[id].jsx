import { View, Text } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";

const PID = () => {
    const { id } = useGlobalSearchParams();
    return (
        <View>
            <Text>{id}</Text>
        </View>
    );
};

export default PID;
