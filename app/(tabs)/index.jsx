import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
    const { user } = useSelector((state) => state.auth);

    // if (!user) return <Redirect href="/(auth)/index" />;

    return (
        <SafeAreaView>
            <View>
                <Text className="text-4xl text-red-500">Home route!</Text>
            </View>
        </SafeAreaView>
    );
}
