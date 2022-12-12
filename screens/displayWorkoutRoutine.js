import * as React from "react";
import { useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Icon, Text } from "@rneui/base";

import DisplayWorkoutInstance from "../components/displayWorkoutInstance";
import getRandomWorkoutByTarget from "../data/utils/getRandomWorkoutByTarget";

export default function DisplayWorkoutRoutine({ navigation, route }) {
  const [woList, setWOList] = useState([]);

  const { targets, filters } = route.params;

  useEffect(() => {
    let tempArr = [];
    targets
      .filter((curr) => curr !== "Select Target")
      .forEach((curr) => {
        tempArr.push(getRandomWorkoutByTarget(curr, filters));
      });
    setWOList(tempArr);
  }, []);

  return (
    <ScrollView>
      {woList.map((curr, index) => {
        return (
          <DisplayWorkoutInstance
            workout={curr}
            key={curr.id}
            index={index}
            woList={woList}
            setWOList={setWOList}
            filters={filters}
          />
        );
      })}
      <Button title={"BEGIN WORKOUT"} containerStyle={{ margin: 20 }} />
    </ScrollView>
  );
}
