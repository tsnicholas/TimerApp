import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"
import TimerSet from "./screens/TimerSet";
import TimerMenu from "./screens/TimerMenu";
import { RootStackParams } from "./types";

const Stack = createStackNavigator<RootStackParams>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TimerSet">
        <Stack.Screen name="TimerSet" component={TimerSet}/>
        <Stack.Screen name="TimerMenu" component={TimerMenu}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
