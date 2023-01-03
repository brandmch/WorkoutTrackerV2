import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateWorkoutRoutine from "./createWorkoutRoutine";
import DisplayWorkoutRoutine from "./displayWorkoutRoutine";
import Home from "./temp";

const Stack = createNativeStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateWorkoutRoutine"
        screenOptions={{}}
      >
        <Stack.Screen
          name="CreateWorkoutRoutine"
          component={CreateWorkoutRoutine}
        />
        <Stack.Screen
          name="DisplayWorkoutRoutine"
          component={DisplayWorkoutRoutine}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
