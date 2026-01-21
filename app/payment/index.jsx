import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function PaymentScreen({ route }) {
    return (
        <SafeAreaView>
            <WebView source={{ uri: route?.param }} />
        </SafeAreaView>
    );
}
