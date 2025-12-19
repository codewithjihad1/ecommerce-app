import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import drawerImg from '../../../../assets/HomeImage/navigation.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ShopHeader = () => {
  const [selectCategory, setSelectCategory] = useState('woman');

  return (
    <View>
      <View className="flex-row justify-between items-center gap-x-6">
        <Image source={drawerImg} />

        <Text className="text-2xl" style={{ fontFamily: 'RalewayBold' }}>
          Gemstore
        </Text>

        <Ionicons name="notifications-outline" size={24} color="black" />

        <Text className="bg-red-600 rounded-full p-1 w-1 h-1 absolute right-1 top-1.5"></Text>
      </View>

      <View className="mt-6 flex-row justify-between">
        <TouchableOpacity onPress={() => setSelectCategory('woman')}>
          <View className="flex-col items-center gap-1">
            <View
              className={`border-[1px] rounded-full p-0.5 ${selectCategory === 'woman' ? 'border-[#004CFF]' : 'border-[#F3F3F3]'}`}
            >
              <View
                className={`border-[1px] p-4 rounded-full ${selectCategory === 'woman' ? 'bg-[#004CFF]' : 'bg-[#F3F3F3] opacity-30`'}`}
              >
                <AntDesign
                  name="woman"
                  size={24}
                  color={`${selectCategory === 'woman' ? 'white' : 'black'}`}
                />
              </View>
            </View>
            <Text>Woman</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectCategory('man')}>
          <View className="flex-col items-center gap-1">
            <View
              className={`border-[1px] rounded-full p-0.5 ${selectCategory === 'man' ? 'border-[#004CFF]' : 'border-[#F3F3F3]'}`}
            >
              <View
                className={`border-[1px] p-4 rounded-full ${selectCategory === 'man' ? 'bg-[#004CFF]' : 'bg-[#F3F3F3] opacity-30`'}`}
              >
                <AntDesign
                  name="man"
                  size={24}
                  color={`${selectCategory === 'man' ? 'white' : 'black'}`}
                />
              </View>
            </View>
            <Text>Man</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectCategory('accessories')}>
          <View className="flex-col items-center gap-1">
            <View
              className={`border-[1px] rounded-full p-0.5 ${selectCategory === 'accessories' ? 'border-[#004CFF]' : 'border-[#F3F3F3]'}`}
            >
              <View
                className={`border-[1px] p-4 rounded-full ${selectCategory === 'accessories' ? 'bg-[#004CFF]' : 'bg-[#F3F3F3] opacity-30`'}`}
              >
                <FontAwesome5
                  name="glasses"
                  size={24}
                  color={`${selectCategory === 'accessories' ? 'white' : 'black'}`}
                />
              </View>
            </View>
            <Text>Accessories</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectCategory('beauty')}>
          <View className="flex-col items-center gap-1">
            <View
              className={`border-[1px] rounded-full p-0.5 ${selectCategory === 'beauty' ? 'border-[#004CFF]' : 'border-[#F3F3F3]'}`}
            >
              <View
                className={`border-[1px] p-4 rounded-full ${selectCategory === 'beauty' ? 'bg-[#004CFF]' : 'bg-[#F3F3F3] opacity-30`'}`}
              >
                <MaterialCommunityIcons
                  name="lipstick"
                  size={24}
                  color={`${selectCategory === 'beauty' ? 'white' : 'black'}`}
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
