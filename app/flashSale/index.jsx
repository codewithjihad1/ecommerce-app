// import { Ionicons } from '@expo/vector-icons';
// import { router, Stack } from 'expo-router';
import React from 'react';
// import { View, Pressable } from 'react-native';
import FlashSalePage from '../../src/components/home/FlashSale/FlashSalePage';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  return (
    <SafeAreaView className='bg-[#FFFFFF] flex-1'>
      {/* <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerShadowVisible: false,

          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              className="p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="#004CFF" />
            </Pressable>
          ),
        }}
      /> */}
      {/* paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 8, */}
  
        <FlashSalePage />
    </SafeAreaView>
  );
};

export default index;
