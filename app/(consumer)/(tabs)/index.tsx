import { View, Text } from "react-native";

export default function ConsumerHomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-light-bg">
      <Text className="text-xl font-bold text-dark-text">Consumer Home</Text>
      <Text className="mt-2 text-grey-text">Provider yang terhubung</Text>
    </View>
  );
}
