import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '@/src/components/drawer/CustomDrawer';

export default function HomeDrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        overlayColor: 'rgba(0,0,0,0.3)',
        drawerStyle: {
          width: '80%',
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
        },
        sceneContainerStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {/* <Drawer.Screen name="index" /> */}
      {/* <Drawer.Screen name="discover" />
      <Drawer.Screen name="orders" />
      <Drawer.Screen name="profile" />
      <Drawer.Screen name="settings" /> */}
    </Drawer>
  );
}
