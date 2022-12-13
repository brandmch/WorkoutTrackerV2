import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Button, Icon, Text, Overlay, CheckBox, Switch } from "@rneui/base";

import CreateWorkoutInstance from "../components/createWorkoutInstance";
import listOfEquipment from "../data/utils/getListOfEquipment";

function DisplayListOfEquipment({ currWOobj, setCurrWOobj }) {
  let { filters } = currWOobj;
  return Object.keys(filters).map((curr) => (
    <CheckBox
      title={curr}
      key={curr}
      checked={filters[curr]}
      onPress={() => {
        setCurrWOobj({
          ...currWOobj,
          filters: { ...filters, [curr]: !tempObj.filters[curr] },
        });
      }}
    />
  ));
}

export default function CreateWorkoutRoutine({ navigation }) {
  const [filterOverlayVisable, setFilterOverlayIsVisable] = useState(false);
  const [currWOobj, setCurrWOobj] = useState({
    targets: ["Select Target"],
    filters: {},
    bodyVtarget: true,
  });

  useEffect(() => {
    let tempObj = { ...currWOobj };
    let equip = listOfEquipment();
    equip.map((curr) => {
      tempObj.filters[curr] = false;
    });
    setCurrWOobj(tempObj);
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
        value={currWOobj.bodyVtarget}
        onValueChange={() => {
          setCurrWOobj({
            ...currWOobj,
            bodyVtarget: !currWOobj.bodyVtarget,
            targets: ["Select Target"],
          });
        }}
      />
      <Overlay
        isVisible={filterOverlayVisable}
        onBackdropPress={() => setFilterOverlayIsVisable(false)}
        overlayStyle={{ backgroundColor: "#FFFFFF" }}
      >
        <Text>Filters</Text>
        <ScrollView>
          <DisplayListOfEquipment
            filters={currWOobj}
            setFilters={setCurrWOobj}
          />
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
        onPress={() =>
          setCurrWOobj({ ...currWOobj, targets: [...targets, "Select Target"] })
        }
      />
      {currWOobj.targets.map((curr, ind) => {
        return (
          <CreateWorkoutInstance
            key={ind}
            ind={ind}
            currWOobj={currWOobj}
            setCurrWOobj={setCurrWOobj}
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
