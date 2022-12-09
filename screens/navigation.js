import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateWorkoutRoutine from "./createWorkoutRoutine";

const Stack = createNativeStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateWorkoutRoutine">
        <Stack.Screen
          name="CreateWorkoutRoutine"
          component={CreateWorkoutRoutine}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
