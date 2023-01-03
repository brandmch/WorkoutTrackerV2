import { useState } from "react";
import { View } from "react-native";
import { Text, FAB, Overlay, Input, Button } from "@rneui/themed";

export default function WeightLog() {
  const [overlayVisable, setOverlayVisable] = useState(false);
  const [weights, setWeights] = useState([]);
  const [input, setInput] = useState();

  return (
    <View style={{ height: "100%" }}>
      <Text>WeightLoss!</Text>
      {weights.map((curr, ind) => (
        <Text key={ind}>{curr}</Text>
      ))}
      <FAB
        icon={{ name: "add", color: "white" }}
        placement="right"
        style={{ paddingRight: 10, paddingBottom: 20 }}
        onPress={() => setOverlayVisable(true)}
        onLongPress={() => setWeights([])}
      />
      <Overlay
        isVisible={overlayVisable}
        onBackdropPress={() => setOverlayVisable(false)}
        overlayStyle={{ width: "60%" }}
      >
        <Input
          placeholder="Weight  (lbs)"
          onChangeText={(text) => setInput(text)}
          keyboardType="number-pad"
          maxLength={6}
        />
        <Button
          title="Log"
          onPress={() => {
            setWeights([...weights, input]);
            setOverlayVisable(false);
          }}
        />
      </Overlay>
    </View>
  );
}
