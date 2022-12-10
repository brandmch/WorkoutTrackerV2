import * as React from "react";
import { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Icon, ListItem, Text, Switch } from "@rneui/base";

import CreateWorkoutInstance from "../components/createWorkoutInstance";

let listOfTargets = [
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system",
  "delts",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "levator scapulae",
  "pectorals",
  "quads",
  "serratus anterior",
  "spine",
  "traps",
  "triceps",
  "upper back",
];

export default function CreateWorkoutRoutine({ navigation }) {
  const [targets, setTargets] = useState(["Select Target"]);

  return (
    <ScrollView>
      <Button
        title={"Add Workout"}
        onPress={() => setTargets([...targets, "Select Target"])}
      />
      {targets.map((curr, ind) => {
        return (
          <CreateWorkoutInstance
            key={ind}
            ind={ind}
            listOfTargets={listOfTargets}
            targets={targets}
            setTargets={setTargets}
          />
        );
      })}
      <Button
        title={"Start"}
        onPress={() => {
          navigation.navigate("DisplayWorkoutRoutine", { targets: targets });
        }}
      />
    </ScrollView>
  );
}
