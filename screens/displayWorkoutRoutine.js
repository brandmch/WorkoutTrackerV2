import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollView, StatusBar, View, StyleSheet } from "react-native";
import { Button, Switch, Text } from "@rneui/base";
import SearchableDropDown from "react-native-searchable-dropdown";
// https://www.npmjs.com/package/react-native-searchable-dropdown

import data from "../data/workoutData.json";
import DisplayWorkoutInstance from "../components/displayWorkoutInstance";
import getRandomWorkoutByTarget from "../data/utils/getRandomWorkoutByTarget";
import favoriteWorkoutTable from "../data/sqlLiteDBs/favoriteWorkoutTable";

function getSearchList(favoriteSwitch, listOfFavs) {
  let tempArr = [];
  for (let i = 0; i < data.length; i++) {
    tempArr.push({ name: data[i].name, id: data[i].id });
  }
  if (favoriteSwitch) {
    tempArr = tempArr.filter((curr) => listOfFavs.includes(curr.id));
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
  // DisplayWorkoutRoutine grabs currWOobj from createWorkoutRoutine.
  // currWOobj = {targets: [], filters: {}, bodyVtarget: boolean}

  const [woList, setWOList] = useState([]);
  const [favoriteSwitch, setFavoriteSwitch] = useState(false);
  const [listOfFavs, setListOfFavs] = useState([]);
  const { currWOobj } = route.params;

  let searchList = getSearchList(favoriteSwitch, listOfFavs);

  useEffect(() => {
    setWOList(getFilters(currWOobj));
    favoriteWorkoutTable.getFavorites(null, setListOfFavs);
  }, [favoriteSwitch]);

  return (
    <View>
      <View>
        <SearchableDropDown
          onItemSelect={(item) => {
            let newWO = getSearchedWorkout(item);
            let tempArr = [...woList];
            tempArr.unshift(newWO);
            setWOList(tempArr);
          }}
          items={searchList}
          textInputProps={styles.searchableDropDown.textInputProps}
          itemStyle={styles.searchableDropDown.itemStyle}
          itemTextStyle={{ color: "#222" }}
          itemsContainerStyle={{ maxHeight: 140 }}
          placeholder="Search for Workout"
        />
        <Text>Favorites</Text>
        <Switch
          value={favoriteSwitch}
          onValueChange={() => {
            setFavoriteSwitch(!favoriteSwitch);
          }}
        />
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  searchableDropDown: {
    textInputProps: {
      padding: 12,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
    },
    itemStyle: {
      padding: 10,
      marginTop: 2,
      backgroundColor: "#ddd",
      borderColor: "#bbb",
      borderWidth: 1,
      borderRadius: 5,
    },
  },
  searchView: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
});
