import * as React from "react";
import { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Icon, Text } from "@rneui/base";

import getRandomWorkout from "../data/utils/getRandomWorkout";
import DisplayWorkoutInstance from "../components/displayWorkoutInstance";

function changeStateWorkout(list, stateFunc) {
  let tempList = [...list];
  tempList.push(getRandomWorkout());
  stateFunc(tempList);
}

export default function CreateWorkoutRoutine({ navigation }) {
  const [workoutList, setWorkoutList] = useState([getRandomWorkout()]);

  return (
    <ScrollView>
      <Button
        title="New Workout"
        onPress={() => {
          changeStateWorkout(workoutList, setWorkoutList);
        }}
        size="lg"
        buttonStyle={{ margin: 15 }}
      />
      {workoutList.map((curr) => {
        return <DisplayWorkoutInstance workout={curr} key={curr.id} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
  },
});
