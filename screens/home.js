import { View } from "react-native";
import { Text } from "@rneui/themed";
import { LineChart } from "react-native-chart-kit";

export default function Home() {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h1>Swag!</Text>
      <Text h1 style={{ fontFamily: "" }}>
        Font needs to be fixed
      </Text>
    </View>
  );
}
