import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Button, Icon, Text, Overlay, CheckBox, Switch } from "@rneui/base";

import CreateWorkoutInstance from "../components/createWorkoutInstance";
import listOfEquipment from "../data/utils/getListOfEquipment";
import listOfBodyParts from "../data/utils/getListOfBodyParts";
import listOfTargets from "../data/utils/getListOfTargets";

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
  const [bodypartvTarget, setBodypartvTarget] = useState(false);

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
      <Switch
        value={bodypartvTarget}
        onValueChange={() => {
          setBodypartvTarget(!bodypartvTarget);
          setTargets(["Select Target"]);
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
        return bodypartvTarget ? (
          <CreateWorkoutInstance
            key={ind}
            ind={ind}
            listOfTargets={listOfTargets}
            targets={targets}
            setTargets={setTargets}
          />
        ) : (
          <CreateWorkoutInstance
            key={ind}
            ind={ind}
            listOfTargets={listOfBodyParts}
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
            bodyPartsvTargets: bodypartvTarget,
          });
        }}
      />
    </ScrollView>
  );
}
