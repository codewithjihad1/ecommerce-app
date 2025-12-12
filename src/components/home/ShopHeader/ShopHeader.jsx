import { View, Text, TextInput, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const ShopHeader = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="">
        <View className="flex-row items-center gap-x-6">
          <Text className="text-3xl font-bold">Shop</Text>

          <View className="flex-1 relative">
            <TextInput
              className="bg-gray-200 py-3 px-6 rounded-full text-lg flex items-center"
              placeholder="Search"
            ></TextInput>
            <Ionicons
              className="absolute right-5 top-3"
              name="camera-outline"
              size={24}
              color="#0042E0"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ShopHeader;
