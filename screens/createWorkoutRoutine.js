import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Icon, Overlay, CheckBox, Switch, FAB } from "@rneui/base";
import { Text } from "@rneui/themed";

import CreateWorkoutInstance from "../components/createWorkoutInstance";
import listOfEquipment from "../data/utils/getListOfEquipment";

// This is the first page that is shown
//
// When START button is pressed, app navigates to DisplayWorkoutRoutine and passes currWOobj through

// DisplayListOfEquipment()
// When filterOverlayVisable = TRUE, this diplays <Overlay> for filters
function DisplayListOfEquipment({ currWOobj, setCurrWOobj }) {
  return Object.keys(currWOobj.filters).map((curr) => (
    <CheckBox
      title={curr}
      key={curr}
      checked={currWOobj.filters[curr]}
      onPress={() => {
        let tempObj = { ...currWOobj };
        tempObj.filters[curr] = !tempObj.filters[curr];
        setCurrWOobj(tempObj);
      }}
    />
  ));
}

export default function CreateWorkoutRoutine({ navigation }) {
  const [filterOverlayVisable, setFilterOverlayIsVisable] = useState(false);
  // currWOobj is the backbone of createWorkoutRoutine and displayWorkoutRoutine
  const [currWOobj, setCurrWOobj] = useState({
    targets: ["Select Target"],
    filters: {},
    // bodyVtarget decides whether user can Select Targets from list of individual muscles or muscle groups
    bodyVtarget: true,
  });

  // On open- gets list of equipment and creates a filter-object.
  // Each equipment is set to FALSE. Switches to TRUE when filter is selected.
  useEffect(() => {
    let tempObj = { ...currWOobj };
    let equip = listOfEquipment();
    equip.map((curr) => {
      tempObj.filters[curr] = false;
    });
    setCurrWOobj(tempObj);
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        <View style={styles.filter_switch_container}>
          <View style={styles.filter}>
            <Icon
              name="filter-list"
              onPress={() => {
                setFilterOverlayIsVisable(!filterOverlayVisable);
              }}
            />
          </View>
          <View style={styles.switch}>
            <Text h4>{currWOobj.bodyVtarget ? "Groups" : "Muscles"}</Text>
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
          </View>
        </View>
        <Overlay
          isVisible={filterOverlayVisable}
          onBackdropPress={() => setFilterOverlayIsVisable(false)}
          overlayStyle={{ backgroundColor: "#FFFFFF" }}
        >
          <Text>Filters</Text>
          <ScrollView>
            <DisplayListOfEquipment
              currWOobj={currWOobj}
              setCurrWOobj={setCurrWOobj}
            />
          </ScrollView>

          <Button
            title={"Apply Filters"}
            onPress={() => {
              setFilterOverlayIsVisable(false);
            }}
          />
        </Overlay>
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
          containerStyle={styles.button_container}
          title={"Start"}
          onPress={() => {
            navigation.navigate("DisplayWorkoutRoutine", {
              currWOobj: currWOobj,
            });
          }}
        />
      </ScrollView>
      <FAB
        icon={{ name: "add", color: "white" }}
        placement="right"
        style={{ paddingRight: 10, paddingBottom: 20 }}
        onPress={() =>
          setCurrWOobj({
            ...currWOobj,
            targets: [...currWOobj.targets, "Select Target"],
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filter_switch_container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  filter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 15,
  },
  switch: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 15,
  },
  button_container: {
    width: "100%",
    padding: 20,
  },
});
