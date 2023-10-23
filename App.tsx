import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"
import TimerSets from "./screens/TimerSets";
import TimerSet from "./screens/TimerSet";
import { RootStackParams } from "./types";

const Stack = createStackNavigator<RootStackParams>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TimerSets">
        <Stack.Screen name="TimerSets" component={TimerSets}/>
        <Stack.Screen name="TimerSet" component={TimerSet}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
