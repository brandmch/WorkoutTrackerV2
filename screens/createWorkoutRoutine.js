import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Button, Icon, Text, Overlay, CheckBox } from "@rneui/base";

import CreateWorkoutInstance from "../components/createWorkoutInstance";
import listOfEquipment from "../data/utils/getListOfEquipment";

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

function DisplayListOfEquipment({ filters, setFilters }) {
  return Object.keys(filters).map((curr) => (
    <CheckBox
      title={curr}
      key={curr}
      checked={filters[curr]}
      onPress={() => {
        let tempObj = { ...filters };
        tempObj[curr] = !tempObj[curr];
        setFilters(tempObj);
      }}
    />
  ));
}
export default function CreateWorkoutRoutine({ navigation }) {
  const [targets, setTargets] = useState(["Select Target"]);
  const [filterOverlayVisable, setFilterOverlayIsVisable] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    let tempObj = {};
    let equip = listOfEquipment();
    equip.map((curr) => {
      tempObj[curr] = false;
    });
    setFilters(tempObj);
  }, []);

  return (
    <ScrollView>
      <Icon
        name="filter-list"
        onPress={() => {
          setFilterOverlayIsVisable(!filterOverlayVisable);
        }}
      />
      <Overlay
        isVisible={filterOverlayVisable}
        onBackdropPress={() => setFilterOverlayIsVisable(false)}
        overlayStyle={{ backgroundColor: "#FFFFFF" }}
      >
        <Text>Filters</Text>
        <ScrollView>
          <DisplayListOfEquipment filters={filters} setFilters={setFilters} />
        </ScrollView>

        <Button
          title={"Apply Filters"}
          onPress={() => {
            setFilterOverlayIsVisable(false);
          }}
        />
      </Overlay>
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
          let equipment = [];
          for (let i in filters) {
            if (filters[i] === true) {
              equipment.push(i);
            }
          }
          navigation.navigate("DisplayWorkoutRoutine", {
            targets: targets,
            filters: equipment,
          });
        }}
      />
    </ScrollView>
  );
}
