import { useState } from "react";

import { Card, Icon, Text, Image } from "@rneui/base";
import { View, Pressable } from "react-native";

import capitalize from "../utils/capitalize";
import getRandomWorkoutByTarget from "../data/utils/getRandomWorkoutByTarget";

const DisplayWorkoutInstance = ({ workout, woList, setWOList, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [workoutState, setWorkout] = useState(workout);

  return (
    <Pressable
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <Card
        containerStyle={{
          flex: 1,
        }}
      >
        <View style={{ display: "flex", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Card.Title
              style={{
                flex: 2,
                position: "absolute",
                float: "left",
                width: "80%",
                marginLeft: 0,
              }}
            >
              {capitalize(workoutState.name)}
            </Card.Title>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Icon
              name="arrow-drop-down"
              containerStyle={{ marginLeft: 40 }}
              onPress={() => {
                setExpanded(!expanded);
              }}
            />
            <Icon
              name="refresh"
              onPress={() => {
                let newWO = getRandomWorkoutByTarget(workoutState.target);
                let tempArr = [...woList];
                tempArr[index] = newWO;
                setWOList(tempArr);
                setWorkout(newWO);
              }}
            />
          </View>
        </View>
        {expanded && (
          <View style={{ display: "flex" }}>
            <Text>{capitalize(workoutState.bodyPart)}</Text>
            <Image
              source={{ uri: workoutState.gifUrl }}
              containerStyle={{ width: 300, height: 300 }}
            />
          </View>
        )}
      </Card>
    </Pressable>
  );
};

export default DisplayWorkoutInstance;
