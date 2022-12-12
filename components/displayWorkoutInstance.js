import { useState } from "react";

import { Card, Icon, Text, Image } from "@rneui/base";
import { View, Pressable } from "react-native";

import capitalize from "../utils/capitalize";
import getRandomWorkoutByTarget from "../data/utils/getRandomWorkoutByTarget";

const DisplayWorkoutInstance = ({
  workout,
  woList,
  setWOList,
  index,
  filters,
  bodyPartsvTargets,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [workoutState, setWorkout] = useState(workout);

  return (
    <Pressable
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <Card>
        <View>
          <View>
            <View>
              <Card.Title>{capitalize(workoutState.name)}</Card.Title>
            </View>
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: workoutState.gifUrl }}
                containerStyle={{ width: 100, height: 100 }}
              />
            </View>
          </View>
          <View>
            <Icon
              name="arrow-drop-down"
              onPress={() => {
                setExpanded(!expanded);
              }}
            />
            <Icon
              name="refresh"
              onPress={() => {
                let newWO = getRandomWorkoutByTarget(
                  workoutState.target,
                  filters,
                  bodyPartsvTargets
                );
                let tempArr = [...woList];
                tempArr[index] = newWO;
                setWOList(tempArr);
                setWorkout(newWO);
              }}
            />
          </View>
        </View>
        {expanded && (
          <View>
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
