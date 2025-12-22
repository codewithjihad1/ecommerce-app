import { PureComponent } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export class NotFound extends PureComponent {
    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text>NotFound</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default NotFound;
