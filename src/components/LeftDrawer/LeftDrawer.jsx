import { View, Pressable, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.8;

export default function LeftDrawer({ visible, onClose, children }) {
    const translateX = useSharedValue(-DRAWER_WIDTH);

    useEffect(() => {
        translateX.value = visible
            ? withTiming(0, { duration: 300 })
            : withTiming(-DRAWER_WIDTH, { duration: 700 });
    }, [visible, translateX]);

    const drawerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    if (!visible) return null;

    return (
        <View className="absolute inset-0 z-50">
            {/* Overlay */}
            <Pressable
                className="absolute inset-0 bg-black/40"
                onPress={onClose}
            />

            {/* Drawer */}
            <Animated.View
                style={[
                    drawerStyle,
                    {
                        position: "absolute",
                        left: 0,
                        width: DRAWER_WIDTH,
                        height: "100%",
                        backgroundColor: "white",
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                        padding: 20,
                    },
                ]}
            >
                {children}
            </Animated.View>
        </View>
    );
}
