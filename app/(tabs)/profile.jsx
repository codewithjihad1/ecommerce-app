import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../src/components/profile/ProfileHeader";


export default function Profile() {
  return (
    <SafeAreaView className='bg-white'>
      {/* This is profile header  */}
      <ProfileHeader />
    </SafeAreaView>
  );
}
