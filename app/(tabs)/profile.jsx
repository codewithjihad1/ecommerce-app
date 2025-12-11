import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../src/components/profile/ProfileHeader";


export default function profile() {
  return (
    <SafeAreaView>
      {/* This is profile header  */}
      <ProfileHeader />
    </SafeAreaView>
  );
}
