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
  const [favoritesArr, setFavoritesArr] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    favoriteWorkoutTable.getFavorites(workout.id, setFavoritesArr);
  }, [refresh]);

  let isFavorite = favoritesArr.includes(workout.id);

  return (
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
                  favoriteWorkoutTable.delete(workout.id);
                  setRefresh(!refresh);
                }}
              />
            ) : (
              <Icon
                name="star-outline"
                onPress={() => {
                  favoriteWorkoutTable.add(workout.id);
                  setRefresh(!refresh);
                }}
              />
            )}
            <View>
              <Card.Title>{capitalize(workout.name)}</Card.Title>
            </View>
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: workout.gifUrl }}
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
                  ? workout.bodyPart
                  : workout.target;
                newWO = getRandomWorkoutByTarget(
                  target,
                  currWOobj.filters,
                  currWOobj.bodyVtarget
                );
                let tempArr = [...woList];
                tempArr[index] = newWO;
                setWOList(tempArr);
              }}
            />
          </View>
        </View>
        {expanded && (
          <View>
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
