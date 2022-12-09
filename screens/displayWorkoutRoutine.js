import * as React from "react";
import { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Icon, Text } from "@rneui/base";

import DisplayWorkoutInstance from "../components/displayWorkoutInstance";
import getRandomWorkoutByTarget from "../data/utils/getRandomWorkoutByTarget";

export default function DisplayWorkoutRoutine({ navigation, route }) {
  const { targets } = route.params;
  console.log("TARGS", targets, typeof targets);
  let woList = [];

  targets
    .filter((curr) => curr !== "Select Target")
    .forEach((curr) => {
      woList.push(getRandomWorkoutByTarget(curr));
    });

  return (
    <ScrollView>
      {woList.map((curr) => {
        return <DisplayWorkoutInstance workout={curr} key={curr.id} />;
      })}
    </ScrollView>
  );
}
