import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

const index = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerShadowVisible: false,

          headerLeftContainerStyle: {
            paddingLeft: 16,
          },

          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              className="p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="#004CFF" />
            </Pressable>
          ),
        }}
      />
      <View className="flex-1 bg-white">
        <View className="px-6">
          <Text>Index</Text>
        </View>
      </View>
    </>
  );
};

export default index;
