import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import drawerImg from "../../../../assets/HomeImage/navigation.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useNavigation } from "expo-router";
// import { DrawerActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryName } from "../../../store/slices/categorySlice";
import { ProductService } from "../../../services/ProductService";
import axios from "axios";

const ShopHeader = ({ onOpenDrawer }) => {
    // const navigation = useNavigation();
    const { categoryName } = useSelector((state) => state.categoryName);
    const dispatch = useDispatch();
    const [categoryNames, setCategoryNames] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const data = await ProductService.getProducts({
                //     per_page: 10,
                //     page: 1,
                // });
                const res = await axios.get('http://localhost:3000/api/products');
                // const data2 = await ProductService.getProductsByCategory(16);
                const data3 = await ProductService.getCategories();
                console.log("Loaded", res.data.products.length, "product");
                // console.log(data[2].name);
                // console.log(data2[0].name);
                const values = data3.map((d) => d.name);
                setCategoryNames(values);
            } catch (error) {
                console.log(error);
            } finally {
            }
        };
        fetchProducts();
    }, []);

    const handleCategory = (category) => {
        dispatch(setCategoryName(category));
    };

    const categories = [
        {
            id: "1",
            name: categoryNames[3],
            icon: (
                <AntDesign
                    name="woman"
                    size={24}
                    color={`${categoryName === "women" ? "white" : "black"}`}
                />
            ),
        },
        {
            id: "2",
            name: categoryNames[2],
            icon: (
                <AntDesign
                    name="man"
                    size={24}
                    color={`${categoryName === "men" ? "white" : "black"}`}
                />
            ),
        },
        {
            id: "3",
            name: categoryNames[0],
            icon: (
                <FontAwesome5
                    name="glasses"
                    size={24}
                    color={`${categoryName === "accessories" ? "white" : "black"}`}
                />
            ),
        },
        {
            id: "4",
            name: categoryNames[1],
            icon: (
                <MaterialCommunityIcons
                    name="lipstick"
                    size={24}
                    color={`${categoryName === "beauty" ? "white" : "black"}`}
                />
            ),
        },
    ];

    return (
        <View>
            <View className="flex-row items-center justify-between gap-x-6">
                {/* Drawer Button */}
                <TouchableOpacity
                    onPress={onOpenDrawer}
                    // onPress={() =>
                    //     navigation.dispatch(DrawerActions.toggleDrawer())
                    // }
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

            <View className="mt-5">
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleCategory(item.name)}
                        >
                            <View className="mr-10 flex-col items-center gap-1">
                                <View
                                    className={`rounded-full border-[1px] p-0.5 ${categoryName === item.name ? "border-[#004CFF]" : "border-[#F3F3F3]"}`}
                                >
                                    <View
                                        className={`rounded-full border-[1px] p-4 ${categoryName === item.name ? "bg-[#004CFF]" : "opacity-30` bg-[#F3F3F3]"}`}
                                    >
                                        {item.icon}
                                    </View>
                                </View>
                                <Text>
                                    {item?.name?.charAt(0).toUpperCase() +
                                        item?.name?.slice(1)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                ></FlatList>
            </View>

            {/* <View className="mt-6 flex-row justify-between">
                <TouchableOpacity onPress={() => handleCategory("women")}>
                    <View className="flex-col items-center gap-1">
                        <View
                            className={`rounded-full border-[1px] p-0.5 ${categoryName === "women" ? "border-[#004CFF]" : "border-[#F3F3F3]"}`}
                        >
                            <View
                                className={`rounded-full border-[1px] p-4 ${categoryName === "women" ? "bg-[#004CFF]" : "opacity-30` bg-[#F3F3F3]"}`}
                            >
                                <AntDesign
                                    name="woman"
                                    size={24}
                                    color={`${categoryName === "women" ? "white" : "black"}`}
                                />
                            </View>
                        </View>
                        <Text>Women</Text>
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
            </View> */}
        </View>
    );
};

export default ShopHeader;
