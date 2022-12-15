import { useEffect, useState } from "react";

import { Card, Icon, Text, Image, Button } from "@rneui/base";
import { View, Pressable } from "react-native";

import capitalize from "../utils/capitalize";
import getRandomWorkoutByTarget from "../data/utils/getRandomWorkoutByTarget";
import favoriteWorkoutTable from "../data/sqlLiteDBs/favoriteWorkoutTable";

const DisplayWorkoutInstance = ({
  workout,
  woList,
  setWOList,
  index,
  currWOobj,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [workoutState, setWorkout] = useState(workout);
  const [isFavorite, setIsFavorite] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    favoriteWorkoutTable.checkIfFavorite(workoutState.id, setIsFavorite);
    setLoading(false);
  }, [refresh]);

  return loading ? (
    <Text>Loading!</Text>
  ) : (
    <Pressable
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <Card>
        <View>
          <View>
            {isFavorite ? (
              <Icon
                name="star"
                onPress={() => {
                  favoriteWorkoutTable.delete(workoutState.id);
                  setRefresh(!refresh);
                }}
              />
            ) : (
              <Icon
                name="star-outline"
                onPress={() => {
                  favoriteWorkoutTable.add(workoutState.id);
                  setRefresh(!refresh);
                }}
              />
            )}
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
                let newWO;
                let target = currWOobj.bodyVtarget
                  ? workoutState.bodyPart
                  : workoutState.target;
                newWO = getRandomWorkoutByTarget(
                  target,
                  currWOobj.filters,
                  currWOobj.bodyVtarget
                );
                let tempArr = [...woList];
                tempArr[index] = newWO;
                favoriteWorkoutTable.checkIfFavorite(newWO.id, setIsFavorite);
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
