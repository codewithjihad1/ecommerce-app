import { Redirect } from 'expo-router';

export default function HomeScreen() {
    return <Redirect href="/(auth)/index" />;

    // return (
    //     <SafeAreaView>
    //         <View>
    //             <Text className="text-4xl text-red-500">Home route!</Text>
    //         </View>
    //     </SafeAreaView>
    // );
}
