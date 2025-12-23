import {
    EvilIcons,
    FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
import ShippingOptions from "../../src/components/checkout/ShippingOptions";
import { supabase } from "../../src/lib/supabase";

export default function Checkout() {
    const { items: products } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    const navigation = useNavigation();

    const [paymentUrl, setPaymentUrl] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editType, setEditType] = useState(null);

    // Form states
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [po, setPo] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [saving, setSaving] = useState(false);

    const subtotal = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    useEffect(() => {
        fetchUserInfo();
    }, [user?.id]);

    const fetchUserInfo = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.getUser();

            if (error) throw error;

            const metadata = data.user?.user_metadata || {};

            setContactInfo({
                phone: metadata.contactInfo?.phone || "",
                email: metadata.contactInfo?.email || user?.email || "",
            });

            setShippingAddress({
                address: metadata.shippingAddress?.address || "",
                po: metadata.shippingAddress?.po || "",
                district: metadata.shippingAddress?.district || "",
                city: metadata.shippingAddress?.city || "",
            });
        } catch (error) {
            console.error("Error fetching user info:", error.message);
            Alert.alert("Error", "Failed to load user information");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (type) => {
        setEditType(type);
        if (type === "contact") {
            setPhone(contactInfo?.phone || "");
            setEmail(contactInfo?.email || "");
        } else {
            setAddress(shippingAddress?.address || "");
            setPo(shippingAddress?.po || "");
            setDistrict(shippingAddress?.district || "");
            setCity(shippingAddress?.city || "");
        }
        setModalVisible(true);
    };

    const saveUserInfo = async () => {
        try {
            setSaving(true);
            const metadata =
                editType === "contact"
                    ? {
                          contactInfo: { phone, email },
                          shippingAddress: shippingAddress,
                      }
                    : {
                          contactInfo: contactInfo,
                          shippingAddress: { address, po, district, city },
                      };

            const { error } = await supabase.auth.updateUser({
                data: metadata,
            });

            if (error) throw error;

            // Update local state
            if (editType === "contact") {
                setContactInfo({ phone, email });
            } else {
                setShippingAddress({ address, po, district, city });
            }

            setModalVisible(false);
            Alert.alert("Success", "Information updated successfully");
        } catch (error) {
            console.error("Error updating user info:", error.message);
            Alert.alert("Error", error.message);
        } finally {
            setSaving(false);
        }
    };

    const hasContactInfo = contactInfo?.phone && contactInfo?.email;
    const hasShippingAddress =
        shippingAddress?.address && shippingAddress?.city;

    const handleCheckout = async () => {
        setLoading(true);
        const paymentData = {
            amount: 100,
            customerName: "John Doe",
            customerEmail: "john@example.com",
            customerPhone: "+8801700000000",
            productName: "Test Product",
            productCategory: "general",
        };
        try {
            const res = await axios.post(
                "http://localhost:5000/api/payment/initiate",
                paymentData,
            );
            if (res?.data) setPaymentUrl(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <>
            {paymentUrl ? (
                <SafeAreaView className="flex-1 justify-center">
                    <WebView source={{ uri: paymentUrl }} />
                </SafeAreaView>
            ) : (
                <SafeAreaView className="flex-1 justify-center p-4">
                    <View className="flex-row items-center gap-4">
                        <FontAwesome
                            name="angle-left"
                            size={30}
                            color="blue"
                            onPress={() => router.back()}
                        />
                        <Text className="text-3xl font-bold">Payment</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Shipping Address */}
                        <Pressable onPress={() => openEditModal("shipping")}>
                            <View className="mt-5 flex-row items-center justify-between gap-4 overflow-hidden rounded-lg bg-slate-200 p-4">
                                <View className="flex-1">
                                    <Text className="text-lg font-bold">
                                        Shipping Address
                                    </Text>
                                    {hasShippingAddress ? (
                                        <Text className="text-base">
                                            {shippingAddress.address},{" "}
                                            {shippingAddress.po},{" "}
                                            {shippingAddress.district},{" "}
                                            {shippingAddress.city}
                                        </Text>
                                    ) : (
                                        <View className="mt-1 flex-row items-center gap-2">
                                            <MaterialCommunityIcons
                                                name="plus-circle"
                                                size={20}
                                                color="gray"
                                            />
                                            <Text className="text-base text-gray-500">
                                                Add shipping address
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View className="h-10 w-10 flex-row items-center justify-center rounded-full bg-primary text-white">
                                    <EvilIcons
                                        name="pencil"
                                        size={28}
                                        color="white"
                                    />
                                </View>
                            </View>
                        </Pressable>

                        {/* Contact Info */}
                        <Pressable onPress={() => openEditModal("contact")}>
                            <View className="mt-3 flex-row items-center justify-between gap-4 overflow-hidden rounded-lg bg-slate-200 p-4">
                                <View className="flex-1">
                                    <Text className="text-lg font-bold">
                                        Contact Information
                                    </Text>
                                    {hasContactInfo ? (
                                        <>
                                            <Text className="text-base">
                                                {contactInfo.phone}
                                            </Text>
                                            <Text className="text-base">
                                                {contactInfo.email}
                                            </Text>
                                        </>
                                    ) : (
                                        <View className="mt-1 flex-row items-center gap-2">
                                            <MaterialCommunityIcons
                                                name="plus-circle"
                                                size={20}
                                                color="gray"
                                            />
                                            <Text className="text-base text-gray-500">
                                                Add contact information
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View className="h-10 w-10 flex-row items-center justify-center rounded-full bg-primary text-white">
                                    <EvilIcons
                                        name="pencil"
                                        size={28}
                                        color="white"
                                    />
                                </View>
                            </View>
                        </Pressable>

                        {/* Cart items */}
                        <View className="mt-4">
                            <View className="mb-4 flex-row flex-wrap items-center justify-between">
                                <Text className="text-3xl font-bold">
                                    Items{" "}
                                </Text>
                                <Button
                                    mode="outlined"
                                    textColor="blue"
                                    style={{ borderColor: "blue" }}
                                >
                                    Apply Voucher
                                </Button>
                            </View>
                            <View className="">
                                {products?.map((item, index) => (
                                    <View
                                        key={index}
                                        className="mb-2 flex-row items-center justify-between rounded-xl bg-gray-200 p-3"
                                    >
                                        <Image
                                            source={{ uri: item?.image }}
                                            className="h-12 w-12 rounded-full border-2 border-gray-300"
                                        />
                                        <Text>{item.title}</Text>
                                        <Text className="text-xl font-bold">
                                            $ {item.price}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Shipping method */}
                        <View>
                            <Text className="my-3 text-3xl font-bold">
                                Shipping Method
                            </Text>
                            <ShippingOptions />
                        </View>
                    </ScrollView>

                    {/* Total amount */}
                    <View className="flex-row items-center justify-between rounded-xl border-t border-gray-200 bg-white px-4 py-4 shadow-current">
                        <Text className="text-xl font-semibold text-gray-900">
                            Total <Text className="font-bold">${subtotal}</Text>
                        </Text>

                        <Pressable
                            onPress={handleCheckout}
                            className="rounded-2xl bg-neutral-900 px-10 py-4 active:opacity-80"
                        >
                            <Text className="text-lg font-semibold text-white">
                                Pay
                            </Text>
                        </Pressable>
                    </View>

                    {/* Edit Modal */}
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <SafeAreaView className="flex-1 bg-white">
                            <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
                                <Text className="text-2xl font-bold">
                                    {editType === "contact"
                                        ? "Edit Contact Info"
                                        : "Edit Shipping Address"}
                                </Text>
                                <Pressable
                                    onPress={() => setModalVisible(false)}
                                >
                                    <FontAwesome
                                        name="times"
                                        size={24}
                                        color="red"
                                    />
                                </Pressable>
                            </View>

                            <ScrollView className="flex-1 p-4">
                                {editType === "contact" ? (
                                    <>
                                        <View className="mb-4">
                                            <Text className="mb-2 text-base font-semibold">
                                                Phone Number
                                            </Text>
                                            <TextInput
                                                className="rounded-lg border border-gray-300 p-3 text-base"
                                                placeholder="Enter phone number"
                                                value={phone}
                                                onChangeText={setPhone}
                                                keyboardType="phone-pad"
                                            />
                                        </View>
                                        <View className="mb-4">
                                            <Text className="mb-2 text-base font-semibold">
                                                Email
                                            </Text>
                                            <TextInput
                                                className="rounded-lg border border-gray-300 p-3 text-base"
                                                placeholder="Enter email"
                                                value={email}
                                                onChangeText={setEmail}
                                                keyboardType="email-address"
                                            />
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <View className="mb-4">
                                            <Text className="mb-2 text-base font-semibold">
                                                Address
                                            </Text>
                                            <TextInput
                                                className="rounded-lg border border-gray-300 p-3 text-base"
                                                placeholder="Enter address"
                                                value={address}
                                                onChangeText={setAddress}
                                            />
                                        </View>
                                        <View className="mb-4">
                                            <Text className="mb-2 text-base font-semibold">
                                                Post Office
                                            </Text>
                                            <TextInput
                                                className="rounded-lg border border-gray-300 p-3 text-base"
                                                placeholder="Enter po"
                                                value={po}
                                                onChangeText={setPo}
                                            />
                                        </View>
                                        <View className="mb-4">
                                            <Text className="mb-2 text-base font-semibold">
                                                District
                                            </Text>
                                            <TextInput
                                                className="rounded-lg border border-gray-300 p-3 text-base"
                                                placeholder="Enter district"
                                                value={district}
                                                onChangeText={setDistrict}
                                            />
                                        </View>
                                        <View className="mb-4">
                                            <Text className="mb-2 text-base font-semibold">
                                                City
                                            </Text>
                                            <TextInput
                                                className="rounded-lg border border-gray-300 p-3 text-base"
                                                placeholder="Enter city"
                                                value={city}
                                                onChangeText={setCity}
                                            />
                                        </View>
                                    </>
                                )}
                            </ScrollView>

                            <View className="flex-row gap-3 border-t border-gray-200 p-4">
                                <Pressable
                                    onPress={() => setModalVisible(false)}
                                    className="flex-1 items-center rounded-lg border border-gray-300 py-3"
                                >
                                    <Text className="text-base font-semibold text-gray-700">
                                        Cancel
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={saveUserInfo}
                                    disabled={saving}
                                    className="flex-1 items-center rounded-lg bg-blue-600 py-3 active:opacity-80"
                                >
                                    <Text className="text-base font-semibold text-white">
                                        {saving ? "Saving..." : "Save"}
                                    </Text>
                                </Pressable>
                            </View>
                        </SafeAreaView>
                    </Modal>
                </SafeAreaView>
            )}
        </>
    );
}
