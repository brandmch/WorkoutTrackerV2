import * as React from "react";
import { useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Icon, Text } from "@rneui/base";

import DisplayWorkoutInstance from "../components/displayWorkoutInstance";
import getRandomWorkoutByTarget from "../data/utils/getRandomWorkoutByTarget";

export default function DisplayWorkoutRoutine({ navigation, route }) {
  const [woList, setWOList] = useState([]);

  const { currWOobj } = route.params;

  useEffect(() => {
    let tempArr = [];
    currWOobj.targets
      .filter((curr) => curr !== "Select Target")
      .forEach((curr) => {
        let newWO = getRandomWorkoutByTarget(
          curr,
          currWOobj.filters,
          currWOobj.bodyVtarget
        );
        console.log(newWO);
        tempArr.push(newWO);
      });
    setWOList(tempArr);
  }, []);

  // console.log(woList);

  return (
    <ScrollView>
      {woList.map((curr, index) => {
        return (
          <DisplayWorkoutInstance
            workout={curr}
            key={index}
            index={index}
            woList={woList}
            setWOList={setWOList}
            currWOobj={currWOobj}
          />
        );
      })}
      <Button title={"BEGIN WORKOUT"} containerStyle={{ margin: 20 }} />
    </ScrollView>
  );
}
