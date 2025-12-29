import {
    View,
    Text,
    Image,
    ScrollView,
    Pressable,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import b1Img from "../../../../assets/flashSaleImage/bubble-01.png";
import b2Img from "../../../../assets/flashSaleImage/bubble-02.png";
import bagImg from "../../../../assets/shopCategoriesImage/bag.png";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import filterImg from "../../../../assets/flashSaleImage/Filter-Icon.png";
import FlashProductCard from "./FlashProductCard";

const discountCategory = ["All", "10", "20", "30", "40", "50"];

const flashProducts = [
    {
        id: 1,
        src: bagImg,
        discount: "20",
        description: "Lorem ipsum dolor sit amet consectetur",
        price: "16",
        rePrice: "10",
    },
    {
        id: 2,
        src: bagImg,
        discount: "40",
        description: "Lorem ipsum dolor sit amet consectetur",
        price: "16",
        rePrice: "10",
    },
    {
        id: 3,
        src: bagImg,
        discount: "10",
        description: "Lorem ipsum dolor sit amet consectetur",
        price: "16",
        rePrice: "10",
    },
    {
        id: 4,
        src: bagImg,
        discount: "30",
        description: "Lorem ipsum dolor sit amet consectetur",
        price: "16",
        rePrice: "10",
    },
    {
        id: 5,
        src: bagImg,
        discount: "50",
        description: "Lorem ipsum dolor sit amet consectetur",
        price: "16",
        rePrice: "10",
    },
    {
        id: 6,
        src: bagImg,
        discount: "20",
        description: "Lorem ipsum dolor sit amet consectetur",
        price: "16",
        rePrice: "10",
    },
];

const FlashSalePage = () => {
    const [discountSelect, setDiscountSelect] = useState(0);
    const [products, setProducts] = useState(flashProducts);
    const router = useRouter();
    const scrollAreaRef = useRef(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    // const { products:p } = useSanityProducts();
    // console.log(p.length);

    const scrollToTop = () => {
        scrollAreaRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    };

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollTop(offsetY > 200);
    };

    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 30,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                let { hours, minutes, seconds } = prevTime;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(timer);
                    return { hours: 0, minutes: 0, seconds: 0 };
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => String(time).padStart(2, "0");

    const handleDiscountSelect = (idx) => {
        setDiscountSelect(idx);

        const discount = discountCategory[idx];
        if (discount === "All") {
            return setProducts(flashProducts);
        }

        const newProducts = flashProducts.filter(
            (p) => p.discount === discount,
        );
        setProducts(newProducts);
    };

    // console.log(products.length);

    const handleGoBack = () => {
        router.back();
    };

    return (
        <View className="relative px-5 pb-16 pt-4">
            <View className="mt-2">
                <TouchableOpacity
                    onPress={handleGoBack}
                    className="flex-row items-center"
                >
                    <Ionicons
                        className="rounded-full bg-[#F9F9F9] p-2"
                        name="arrow-back"
                        size={24}
                        color="#004CFF"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                ref={scrollAreaRef}
                // ref={scrollRef}
                // style={{ paddingTop: headerHight }}
            >
                <View className="mt-2 flex-row items-center justify-between">
                    <View className="">
                        <Text
                            className="text-[30px]"
                            style={{ fontFamily: "RalewayBold" }}
                        >
                            Flash Sale
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-x-3">
                        <MaterialIcons
                            name="access-alarm"
                            size={24}
                            color="white"
                        />

                        <View className="flex-row items-center gap-x-1">
                            <View className="min-w-[35px] items-center rounded-lg bg-[#F3F3F3] p-1">
                                <Text className="text-lg font-bold">
                                    {formatTime(timeLeft.hours)}
                                </Text>
                            </View>
                            <Text className="font-bold text-white">:</Text>
                            <View className="min-w-[35px] items-center rounded-lg bg-[#F3F3F3] p-1">
                                <Text className="text-lg font-bold">
                                    {formatTime(timeLeft.minutes)}
                                </Text>
                            </View>
                            <Text className="font-bold text-white">:</Text>
                            <View className="min-w-[35px] items-center rounded-lg bg-[#F3F3F3] p-1">
                                <Text className="text-lg font-bold">
                                    {formatTime(timeLeft.seconds)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={{ fontFamily: "Raleway" }}>
                        Choose Your Discount
                    </Text>
                </View>

                <View className="mt-10 flex-row justify-between rounded-xl bg-[#F9F9F9]">
                    {discountCategory.map((d, i) => (
                        <Pressable
                            key={i}
                            className={`p-2 ${i === discountSelect && "rounded-xl border-2 border-[#004CFF] bg-[#FFFFFF] px-3"}`}
                            onPress={() => handleDiscountSelect(i)}
                        >
                            <Text
                                className={`text-xl font-semibold ${i === discountSelect && "text-2xl text-[#004CFF]"}`}
                            >
                                {d}%
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <View className="mt-10">
                    <View className="flex-row justify-between">
                        <Text className="text-2xl font-semibold">
                            {discountCategory[discountSelect]}
                            {discountSelect === 0 ? "" : "%"} Discount
                        </Text>
                        <TouchableOpacity>
                            <Image
                                className="h-8 w-8"
                                resizeMode="contain"
                                source={filterImg}
                            ></Image>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row flex-wrap">
                        {products.map((product, i) => (
                            <FlashProductCard
                                key={i}
                                product={product}
                            ></FlashProductCard>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {showScrollTop && (
                <View
                    style={{
                        position: "absolute",
                        bottom: 90,
                        right: 20,
                    }}
                >
                    <Pressable
                        onPress={scrollToTop}
                        style={{
                            backgroundColor: "#004CFF",
                            width: 56,
                            height: 56,
                            borderRadius: 28,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                            elevation: 8,
                        }}
                    >
                        <Ionicons name="arrow-up" size={28} color="white" />
                    </Pressable>
                </View>
            )}

            <Image
                className="absolute -right-20 top-0 -z-10 w-full"
                source={b1Img}
                resizeMode="contain"
            />
            <Image
                className="absolute -right-8 top-0 -z-20 w-full"
                source={b2Img}
                resizeMode="contain"
            />
        </View>
    );
};

export default FlashSalePage;
