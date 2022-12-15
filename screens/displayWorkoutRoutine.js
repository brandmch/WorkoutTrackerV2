import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { Button, Card, Icon, Text, SearchBar, Overlay } from "@rneui/base";
import SearchableDropDown from "react-native-searchable-dropdown";

import data from "../data/workoutData.json";
import DisplayWorkoutInstance from "../components/displayWorkoutInstance";
import getRandomWorkoutByTarget from "../data/utils/getRandomWorkoutByTarget";
import favoriteWorkoutTable from "../data/sqlLiteDBs/favoriteWorkoutTable";

function getSearchList() {
  let tempArr = [];
  for (let i = 0; i < data.length; i++) {
    tempArr.push({ name: data[i].name, id: data[i].id });
  }
  return tempArr.sort();
}

function getFilters(currWOobj) {
  let tempArr = [];
  currWOobj.targets
    .filter((curr) => curr !== "Select Target")
    .forEach((curr) => {
      let newWO = getRandomWorkoutByTarget(
        curr,
        currWOobj.filters,
        currWOobj.bodyVtarget
      );
      tempArr.push(newWO);
    });
  return tempArr;
}

function getSearchedWorkout(item) {
  const { id, name } = item;
  return data.find((ele) => ele.id === id);
}

export default function DisplayWorkoutRoutine({ navigation, route }) {
  const [woList, setWOList] = useState([]);
  const { currWOobj } = route.params;

  let searchList = getSearchList();

  useEffect(() => {
    setWOList(getFilters(currWOobj));
  }, []);

  return (
    <View>
      <React.Fragment>
        <SearchableDropDown
          onItemSelect={(item) => {
            let newWO = getSearchedWorkout(item);
            let tempArr = [...woList];
            tempArr.unshift(newWO);
            setWOList(tempArr);
          }}
          items={searchList}
          textInputProps={{
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "#ddd",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{ color: "#222" }}
          itemsContainerStyle={{ maxHeight: 140 }}
        />
      </React.Fragment>
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
        <Button title={"all"} onPress={() => favoriteWorkoutTable.getAll()} />
      </ScrollView>
    </View>
  );
}
