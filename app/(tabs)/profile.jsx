import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../src/lib/supabase";
import { signOut } from "../../src/store/slices/authSlice";

const menuItems = [
    {
        id: 1,
        icon: "location-outline",
        label: "Address",
        type: "accordion",
        gradient: ["#FF6B9D", "#C44569"],
    },
    {
        id: 2,
        icon: "card-outline",
        label: "Payment method",
        type: "accordion",
        gradient: ["#667EEA", "#764BA2"],
    },
    {
        id: 3,
        icon: "pricetag-outline",
        label: "Voucher",
        type: "accordion",
        gradient: ["#F093FB", "#F5576C"],
    },
    {
        id: 4,
        icon: "heart-outline",
        label: "My Wishlist",
        type: "navigate",
        route: "/wishlist",
        gradient: ["#FA709A", "#FEE140"],
    },
    {
        id: 5,
        icon: "star-outline",
        label: "Rate this app",
        type: "action",
        gradient: ["#FFD89B", "#19547B"],
    },
];

export default function ProfileScreen() {
    const { user, loading } = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    // Modal and edit states
    const [modalVisible, setModalVisible] = useState(false);
    const [editType, setEditType] = useState(null);
    const [saving, setSaving] = useState(false);

    // Address states
    const [address, setAddress] = useState("");
    const [po, setPo] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");

    // Contact states
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    // Stored data
    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        po: "",
        district: "",
        city: "",
    });
    const [contactInfo, setContactInfo] = useState({
        phone: "",
        email: "",
    });

    const [expandedIndex, setExpandedIndex] = useState(null);

    // Fetch user info on mount
    useEffect(() => {
        if (user?.id) {
            fetchUserInfo();
        }
    }, [user?.id]);

    const fetchUserInfo = async () => {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;

            const metadata = data.user?.user_metadata || {};
            const addressData = {
                address: metadata.shippingAddress?.address || "",
                po: metadata.shippingAddress?.po || "",
                district: metadata.shippingAddress?.district || "",
                city: metadata.shippingAddress?.city || "",
            };
            const contactData = {
                phone: metadata.contactInfo?.phone || "",
                email: metadata.contactInfo?.email || "",
            };

            setShippingAddress(addressData);
            setContactInfo(contactData);
        } catch (error) {
            console.error("Error fetching user info:", error.message);
            Alert.alert("Error", "Failed to load user information");
        }
    };

    const handleToggleAccordion = (index) => {
        setExpandedIndex((prev) => (prev === index ? null : index));
    };

    const handleSignout = async () => {
        try {
            await dispatch(signOut()).unwrap();
            router.replace("/(auth)");
        } catch (error) {
            Alert.alert("Error", error?.message || "Something went wrong");
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

    if (loading && !user) {
        return (
            <View className="flex-1 items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                <ActivityIndicator size="large" color="#667EEA" />
            </View>
        );
    }

    if (!user) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-6">
                <View className="items-center rounded-3xl bg-white p-8 shadow-xl">
                    <Ionicons
                        name="person-circle-outline"
                        size={80}
                        color="#667EEA"
                    />
                    <Text className="mt-4 text-2xl font-bold text-gray-800">
                        Welcome Back!
                    </Text>
                    <Text className="mt-2 text-center text-gray-600">
                        Please log in to view your profile and access all
                        features.
                    </Text>
                    <TouchableOpacity
                        className="mt-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 shadow-lg"
                        onPress={() => router.push("/(auth)")}
                    >
                        <Text className="text-lg font-semibold text-white">
                            Go to Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const AddressAccordion = () => (
        <View className="pt-2">
            <View className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
                <View className="flex-row items-center p-4">
                    <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                        <Ionicons name="home" size={20} color="#F5576C" />
                    </View>
                    <View className="flex-1">
                        <Text className="font-semibold text-gray-800">
                            Home
                        </Text>
                        <Text className="text-sm text-gray-500">
                            {shippingAddress.address ||
                            shippingAddress.po ||
                            shippingAddress.district ||
                            shippingAddress.city
                                ? `${shippingAddress.address}, ${shippingAddress.po}, ${shippingAddress.district}, ${shippingAddress.city}`
                                : "No address added yet"}
                        </Text>
                    </View>
                    {shippingAddress.address && (
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#10B981"
                        />
                    )}
                </View>
            </View>

            <TouchableOpacity
                className="flex-row items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-pink-50 py-3"
                onPress={() => openEditModal("address")}
            >
                <Ionicons name="add-circle-outline" size={20} color="#667EEA" />
                <Text className="ml-2 font-semibold text-blue-600">
                    {shippingAddress.address
                        ? "Edit address"
                        : "Add new address"}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const PaymentAccordion = () => (
        <View className="pt-2">
            <View className="mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 shadow-lg">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-xs text-white opacity-80">
                            Primary Card
                        </Text>
                        <Text className="mt-1 text-lg font-bold text-white">
                            •••• 4242
                        </Text>
                        <Text className="mt-2 text-xs text-white opacity-80">
                            Visa
                        </Text>
                    </View>
                    <Ionicons
                        name="card"
                        size={32}
                        color="rgba(255,255,255,0.3)"
                    />
                </View>
            </View>

            <TouchableOpacity className="flex-row items-center justify-center rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 py-3">
                <Ionicons name="add-circle-outline" size={20} color="#667EEA" />
                <Text className="ml-2 font-semibold text-purple-600">
                    Add payment method
                </Text>
            </TouchableOpacity>
        </View>
    );

    const VoucherAccordion = () => (
        <View className="pt-2">
            <View className="mb-3 overflow-hidden rounded-xl border-2 border-dashed border-pink-300 p-4">
                <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                        <Text className="text-xs font-semibold uppercase tracking-wider text-pink-600">
                            WELCOME10
                        </Text>
                        <Text className="mt-1 text-lg font-bold text-gray-800">
                            10% OFF
                        </Text>
                        <Text className="mt-1 text-xs text-gray-500">
                            Valid until Dec 31
                        </Text>
                    </View>
                    <View className="h-12 w-12 items-center justify-center rounded-full bg-pink-200">
                        <Ionicons name="gift" size={24} color="#F5576C" />
                    </View>
                </View>
            </View>

            <TouchableOpacity className="flex-row items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-pink-50 py-3">
                <Ionicons name="add-circle-outline" size={20} color="#F5576C" />
                <Text className="ml-2 font-semibold text-pink-600">
                    Add voucher code
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderAccordionContent = (label) => {
        switch (label) {
            case "Address":
                return <AddressAccordion />;
            case "Payment method":
                return <PaymentAccordion />;
            case "Voucher":
                return <VoucherAccordion />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Beautiful Header with Gradient */}
                <View className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 px-6 pb-8 pt-6">
                    {/* Decorative circles */}
                    <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10" />
                    <View className="absolute -left-16 top-20 h-32 w-32 rounded-full bg-white opacity-10" />

                    <View className="flex-row items-center justify-between">
                        <View className="flex-1 flex-row items-center">
                            {/* Enhanced Avatar with gradient border */}
                            <View className="h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 p-1">
                                <View className="h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-200">
                                    {user?.user_metadata?.avatar ? (
                                        <Image
                                            source={{
                                                uri: user.user_metadata.avatar,
                                            }}
                                            className="h-full w-full"
                                        />
                                    ) : (
                                        <View className="h-full w-full items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
                                            <Text className="text-3xl font-bold">
                                                {user?.user_metadata?.name?.charAt(
                                                    0,
                                                )}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>

                            {/* User info with better typography */}
                            <View className="ml-4 flex-1">
                                <Text className="text-xl font-bold">
                                    {user?.user_metadata?.name}
                                </Text>
                                <Text className="mt-1 text-sm opacity-90">
                                    {user?.user_metadata?.email}
                                </Text>
                            </View>
                        </View>

                        {/* Settings with backdrop */}
                        <TouchableOpacity
                            onPress={() => router.push("/settings")}
                            className="h-10 w-10 items-center justify-center rounded-full bg-gray-500"
                        >
                            <Ionicons
                                name="settings-outline"
                                size={22}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Enhanced Menu Items */}
                <View className="mx-4 mt-6">
                    {menuItems.map((item, index) => {
                        const isExpanded = expandedIndex === index;
                        const isAccordion = item.type === "accordion";

                        const handlePress = () => {
                            if (isAccordion) {
                                handleToggleAccordion(index);
                            } else if (item.type === "navigate") {
                                router.push(item.route);
                            } else {
                                console.log(item.label);
                            }
                        };

                        return (
                            <View key={item.id} className="mb-3">
                                <TouchableOpacity
                                    onPress={handlePress}
                                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                                    activeOpacity={0.7}
                                >
                                    <View className="flex-row items-center px-5 py-4">
                                        <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                                            <Ionicons
                                                name={item.icon}
                                                size={22}
                                                color="#667EEA"
                                            />
                                        </View>

                                        <Text className="flex-1 text-base font-semibold text-gray-800">
                                            {item.label}
                                        </Text>

                                        <Ionicons
                                            name={
                                                isAccordion
                                                    ? isExpanded
                                                        ? "chevron-up"
                                                        : "chevron-down"
                                                    : "chevron-forward"
                                            }
                                            size={20}
                                            color="#9CA3AF"
                                        />
                                    </View>

                                    {/* Accordion content */}
                                    {isAccordion && isExpanded && (
                                        <View className="border-t border-gray-100 bg-gray-50 px-5 pb-5">
                                            {renderAccordionContent(item.label)}
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* Beautiful Logout Button */}
                <TouchableOpacity
                    onPress={handleSignout}
                    className="mx-4 mb-8 mt-2 overflow-hidden rounded-2xl bg-white shadow-sm"
                    activeOpacity={0.7}
                >
                    <View className="flex-row items-center p-5">
                        <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                            <Ionicons
                                name="log-out-outline"
                                size={22}
                                color="#EF4444"
                            />
                        </View>
                        <Text className="flex-1 text-base font-semibold text-red-600">
                            Log out
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#EF4444"
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>

            {/* Edit Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-end">
                    <View className="rounded-t-3xl bg-white px-6 pb-8 pt-6 shadow-2xl">
                        <View className="mb-6 flex-row items-center justify-between">
                            <Text className="text-xl font-bold text-gray-800">
                                {editType === "contact"
                                    ? "Edit Contact"
                                    : "Edit Address"}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        </View>

                        {editType === "contact" ? (
                            <>
                                <TextInput
                                    className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
                                    placeholder="Phone"
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                                <TextInput
                                    className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                />
                            </>
                        ) : (
                            <>
                                <TextInput
                                    className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
                                    placeholder="Address"
                                    value={address}
                                    onChangeText={setAddress}
                                />
                                <TextInput
                                    className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
                                    placeholder="PO Box"
                                    value={po}
                                    onChangeText={setPo}
                                />
                                <TextInput
                                    className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
                                    placeholder="District"
                                    value={district}
                                    onChangeText={setDistrict}
                                />
                                <TextInput
                                    className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
                                    placeholder="City"
                                    value={city}
                                    onChangeText={setCity}
                                />
                            </>
                        )}

                        <TouchableOpacity
                            onPress={saveUserInfo}
                            disabled={saving}
                            className="rounded-xl bg-purple-600 py-4"
                        >
                            {saving ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="text-center font-semibold text-white">
                                    Save Changes
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
