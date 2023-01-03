import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreateWorkoutRoutine from "./createWorkoutRoutine";
import DisplayWorkoutRoutine from "./displayWorkoutRoutine";
import Home from "./home";
import WeightLog from "./weightLog";

const WorkoutRoutineStack = createNativeStackNavigator();

function WORStack() {
  return (
    <WorkoutRoutineStack.Navigator>
      <WorkoutRoutineStack.Screen
        name="CreateWorkoutRoutine"
        component={CreateWorkoutRoutine}
      />
      <WorkoutRoutineStack.Screen
        name="DisplayWorkoutRoutine"
        component={DisplayWorkoutRoutine}
      />
    </WorkoutRoutineStack.Navigator>
  );
}

const WeightLogStack = createNativeStackNavigator();

function WLStack() {
  return (
    <WeightLogStack.Navigator>
      <WeightLogStack.Screen name="WeightLog" component={WeightLog} />
    </WeightLogStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="WORStack" component={WORStack} />
        <Tab.Screen name="WLStack" component={WLStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
