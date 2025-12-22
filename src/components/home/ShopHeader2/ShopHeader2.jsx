import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import drawerImg from "../../../../assets/HomeImage/navigation.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryName } from "../../../store/slices/categorySlice";

const ShopHeader = () => {
    const navigation = useNavigation();
    const { categoryName } = useSelector((state) => state.categoryName);
    const dispatch = useDispatch();

    const handleCategory = (category) => {
        dispatch(setCategoryName(category));
    };

    return (
        <View>
            <View className="flex-row items-center justify-between gap-x-6">
                {/* Drawer Button */}
                <TouchableOpacity
                    onPress={() =>
                        navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                >
                    <Image source={drawerImg} />
                </TouchableOpacity>

                <Text
                    className="text-2xl"
                    style={{ fontFamily: "RalewayBold" }}
                >
                    Gemstore
                </Text>

                <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="black"
                />

                <Text className="absolute right-1 top-1.5 h-1 w-1 rounded-full bg-red-600 p-1"></Text>
            </View>

            <View className="mt-6 flex-row justify-between">
                <TouchableOpacity onPress={() => handleCategory("woman")}>
                    <View className="flex-col items-center gap-1">
                        <View
                            className={`rounded-full border-[1px] p-0.5 ${categoryName === "woman" ? "border-[#004CFF]" : "border-[#F3F3F3]"}`}
                        >
                            <View
                                className={`rounded-full border-[1px] p-4 ${categoryName === "woman" ? "bg-[#004CFF]" : "opacity-30` bg-[#F3F3F3]"}`}
                            >
                                <AntDesign
                                    name="woman"
                                    size={24}
                                    color={`${categoryName === "woman" ? "white" : "black"}`}
                                />
                            </View>
                        </View>
                        <Text>Woman</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleCategory("men")}>
                    <View className="flex-col items-center gap-1">
                        <View
                            className={`rounded-full border-[1px] p-0.5 ${categoryName === "men" ? "border-[#004CFF]" : "border-[#F3F3F3]"}`}
                        >
                            <View
                                className={`rounded-full border-[1px] p-4 ${categoryName === "men" ? "bg-[#004CFF]" : "opacity-30` bg-[#F3F3F3]"}`}
                            >
                                <AntDesign
                                    name="man"
                                    size={24}
                                    color={`${categoryName === "men" ? "white" : "black"}`}
                                />
                            </View>
                        </View>
                        <Text>Men</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleCategory("accessories")}>
                    <View className="flex-col items-center gap-1">
                        <View
                            className={`rounded-full border-[1px] p-0.5 ${categoryName === "accessories" ? "border-[#004CFF]" : "border-[#F3F3F3]"}`}
                        >
                            <View
                                className={`rounded-full border-[1px] p-4 ${categoryName === "accessories" ? "bg-[#004CFF]" : "opacity-30` bg-[#F3F3F3]"}`}
                            >
                                <FontAwesome5
                                    name="glasses"
                                    size={24}
                                    color={`${categoryName === "accessories" ? "white" : "black"}`}
                                />
                            </View>
                        </View>
                        <Text>Accessories</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleCategory("beauty")}>
                    <View className="flex-col items-center gap-1">
                        <View
                            className={`rounded-full border-[1px] p-0.5 ${categoryName === "beauty" ? "border-[#004CFF]" : "border-[#F3F3F3]"}`}
                        >
                            <View
                                className={`rounded-full border-[1px] p-4 ${categoryName === "beauty" ? "bg-[#004CFF]" : "opacity-30` bg-[#F3F3F3]"}`}
                            >
                                <MaterialCommunityIcons
                                    name="lipstick"
                                    size={24}
                                    color={`${categoryName === "beauty" ? "white" : "black"}`}
                                />
                            </View>
                        </View>
                        <Text>Beauty</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ShopHeader;
