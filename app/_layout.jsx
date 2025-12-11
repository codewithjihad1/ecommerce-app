import { store } from '@/src/store/index';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import '../global.css';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {
    return (
        <>
            <Provider store={store}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                </Stack>
            </Provider>
        </>
    );
}
