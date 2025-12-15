import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import menu from "../../../assets/profile/menu.png";
import profileImage from "../../../assets/profile/profile.png";
import settings from "../../../assets/profile/Settings.png";
import vouchers from "../../../assets/profile/Vouchers.png";
import RecentlyViewProduct from "./recentViewProduct/RecentlyViewProduct";
import Stories from "./stories/Stories";
import NewItem from "./newitem/NewProducts";
import MostPopular from "./mostpopular/MostPopular";

const profileData = {
  img: profileImage,
  name: "Maxwell",
  gmail: "maxwell12@gmail.com",
};
const leftSideIcons = [menu, vouchers, settings];

const myOrdersCategoryButtons = ["To Pay", "To Receive", "To Review"];

export default function ProfileHeader() {
  return (
    <View className="px-5 py-5 my-5 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center">
          {/* Left side  */}
          <View className="flex-row gap-5 items-center">
            <Image
              source={profileData.img}
              resizeMode="contain"
              className="border-4 rounded-full border-white w-[50px] h-[50px]"
            />
            <TouchableOpacity>
              <Text
                style={{ fontFamily: "Poppins" }}
                className="bg-blue-700 text-lg text-white py-3 px-5 rounded-full font-semibold">
                My Activity
              </Text>
            </TouchableOpacity>
          </View>

          {/* Right Side */}
          <View className="flex-row items-center gap-2">
            {leftSideIcons.map((icon, index) => (
              <TouchableOpacity key={index}>
                <Image source={icon} resizeMode="contain" className="w-[50px] h-[50px]" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Profile name  */}
        <Text style={{ fontFamily: "RalewayBold" }} className="text-4xl  mt-5 mb-3 ">
          Hello, {profileData.name}!
        </Text>

        {/* Announcement */}
        <View className="bg-[#F9F9F9] px-5 py-4 rounded-2xl mt-3">
          <Text style={{ fontFamily: "PoppinsBold" }} className="mb-3 text-xl font-semibold">
            Announcement
          </Text>
          <TouchableOpacity className="flex-row items-center gap-3">
            <View className="flex-1">
              <Text style={{ fontFamily: "Poppins" }} className="text-sm leading-5">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error amet provident quae consequuntur,
                exercitationem temporibus dolor mollitia optio dolorem quod.
              </Text>
            </View>
            <View className="bg-blue-700 p-2 rounded-full">
              <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        {/* Recent product layout */}
        <RecentlyViewProduct />

        {/* My orders category button */}
        <Text style={{ fontFamily: "RalewayBold" }} className="text-2xl">
          My Orders
        </Text>
        <View className="flex-row gap-5 justify-center mt-5">
          {myOrdersCategoryButtons.map((buttonTitle, index) => (
            <TouchableOpacity
              key={index}
              className="bg-blue-100 py-3 px-5 rounded-full"
              onPress={() => console.log(buttonTitle)}>
              <Text className="text-blue-500 text-center font-semibold text-xl ">{buttonTitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Stories section  */}
        <Stories />

        {/* New Items section */}

        {/* I am goinf to new product page fro here  */}
        <NewItem />

        {/* Most popular */}
        <MostPopular/>
      </ScrollView>
    </View>
  );
}
