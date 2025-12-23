import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function ShippingOptions() {
    const [selected, setSelected] = useState('standard');

    const Option = ({ id, title, time, price }) => {
        const active = selected === id;

        return (
            <Pressable
                onPress={() => setSelected(id)}
                className={`
          flex-row items-center justify-between
          rounded-2xl border p-4 mb-3
          ${active ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-gray-200'}
        `}>
                {/* Left */}
                <View className="flex-row items-center gap-4">
                    {/* Radio */}
                    <View
                        className={`
              h-7 w-7 rounded-full border-2 items-center justify-center
              ${active ? 'border-indigo-600' : 'border-gray-300'}
            `}>
                        {active && (
                            <FontAwesome
                                name="check"
                                size={16}
                                color="white"
                                className="bg-primary rounded-full w-5 h-5"
                            />
                        )}
                    </View>

                    <Text className="text-base font-medium text-gray-900">{title}</Text>

                    <Text className="text-sm font-medium text-blue-600">{time}</Text>
                </View>

                {/* Price */}
                <Text className="text-base font-semibold text-gray-900">{price}</Text>
            </Pressable>
        );
    };

    return (
        <View className="p-4">
            <Text className="text-lg font-semibold mb-3 text-gray-900">Shipping Options</Text>

            <Option id="standard" title="Standard" time="5–7 days" price="FREE" />

            <Option id="express" title="Express" time="1–2 days" price="$12.00" />
        </View>
    );
}
