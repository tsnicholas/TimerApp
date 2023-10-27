import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TimerSetsScreen from "./screens/TimerSets";
import TimerSetScreen from "./screens/TimerSet";
import { RootStackParams } from "./types";
import { TimerSetsProvider } from "./contexts/TimerSetsContext";

const Stack = createStackNavigator<RootStackParams>();

export default function App() {
  return (
    <TimerSetsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TimerSets">
          <Stack.Screen name="TimerSets" component={TimerSetsScreen}/>
          <Stack.Screen name="TimerSet" component={TimerSetScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TimerSetsProvider>
  );
}
