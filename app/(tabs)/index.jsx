import { SafeAreaView } from 'react-native-safe-area-context';
import ShopHeader from '../../src/components/home/ShopHeader/ShopHeader';
import ShopSlider from '../../src/components/home/ShopSlider/ShopSlider';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="pt-4 px-6 pb-2">
        <ShopHeader></ShopHeader>
        <ShopSlider></ShopSlider>
      </View>
    </SafeAreaView>
  );
}
