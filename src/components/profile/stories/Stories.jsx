import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import story_image_one from "../../../../assets/profile/Story_image_one.png";
import story_image_three from "../../../../assets/profile/Story_image_three.png";
import story_image_two from "../../../../assets/profile/Story_image_two.png";

const stories = [story_image_one, story_image_two, story_image_three];

export default function Stories() {
  return (
    <View className='my-8'>
      <Text style={{fontFamily:'RalewayBold'}} className='text-2xl mb-5'>Stories</Text>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Image source={item} className="w-[150px] h-[200px] rounded-xl" resizeMode="cover" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
