import { store } from '@/src/store/index';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider, useDispatch, useSelector } from 'react-redux';
import '../global.css';
import { supabase } from '../src/lib/supabase';
import { checkSession, setSession } from '../src/store/slices/authSlice';
// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
    anchor: '(tabs)',
};
<<<<<<< HEAD
=======

>>>>>>> ece76da95e19bf1d7b701692e3fec4066e31dbfd
// check the user session are already exist
function AuthGate() {
    const dispatch = useDispatch();
    const router = useRouter();
    const segments = useSegments();
<<<<<<< HEAD
=======

>>>>>>> ece76da95e19bf1d7b701692e3fec4066e31dbfd
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            dispatch(setSession(session));
        });
<<<<<<< HEAD
=======

>>>>>>> ece76da95e19bf1d7b701692e3fec4066e31dbfd
        return () => listener.subscription.unsubscribe();
    }, [dispatch]);
    // restore session on app start
    useEffect(() => {
        dispatch(checkSession());
    }, [dispatch]);
    useEffect(() => {
        if (loading) return;
        const inAuthGroup = segments[0] === '(auth)';
        if (!isAuthenticated && !inAuthGroup) {
            router.replace('/(auth)/login');
        }
        if (isAuthenticated && inAuthGroup) {
            router.replace('/(tabs)');
        }
    }, [isAuthenticated, loading, router, segments]);
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="product" />
            <Stack.Screen name="checkout" />

        </Stack>
    );
}
// Root layout
export default function RootLayout() {
    const [fontsLoaded, fontsError] = useFonts({
        Poppins: require('../assets/font/Poppins-Regular.ttf'),
        RalewayBold: require('../assets/font/Raleway-Bold.ttf'),
        Raleway: require('../assets/font/Raleway-Regular.ttf'),
        PoppinsBold: require('../assets/font/Poppins-Bold.ttf'),
    });
    useEffect(() => {
        // console.log(fontsError);
        if (fontsLoaded || fontsError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontsError]);
    if (!fontsLoaded && !fontsError) {
        return null;
    }
    return (
        <Provider store={store}>
            <AuthGate />
        </Provider>
    );
}










