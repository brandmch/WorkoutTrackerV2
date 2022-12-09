import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateWorkoutRoutine from "./createWorkoutRoutine";
import DisplayWorkoutRoutine from "./displayWorkoutRoutine";

const Stack = createNativeStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateWorkoutRoutine">
        <Stack.Screen
          name="CreateWorkoutRoutine"
          component={CreateWorkoutRoutine}
        />
        <Stack.Screen
          name="DisplayWorkoutRoutine"
          component={DisplayWorkoutRoutine}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
