import { useState } from "react";

import { Card, Icon, Text, Image } from "@rneui/base";
import { View, Pressable } from "react-native";

import capitalize from "../utils/capitalize";

const DisplayWorkoutInstance = ({ workout }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable>
      <Card containerStyle={{ alignItems: "flex-start" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Card.Title>{workout.name}</Card.Title>
          <Icon
            name="arrow-drop-down"
            containerStyle={{ marginLeft: 40 }}
            onPress={() => {
              setExpanded(!expanded);
            }}
          />
        </View>

        {expanded && (
          <View style={{ display: "flex" }}>
            <Text>{capitalize(workout.bodyPart)}</Text>
            <Image
              source={{ uri: workout.gifUrl }}
              containerStyle={{ width: 300, height: 300 }}
            />
          </View>
        )}
      </Card>
    </Pressable>
  );
};

export default DisplayWorkoutInstance;
