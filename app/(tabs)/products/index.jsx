import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Product = () => {
  return (
    <View>
      <Text>product</Text>
      <Link href="/products/1">Go Product</Link>
    </View>
  )
}

export default Product