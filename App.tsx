import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";

/**
 * Replace this file with your code from Project 1.
 */

export default function App() {
  return (
    <View style={styles.app}>
      <Text style={styles.title}>Project 2</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  app: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#85f0f0",
    alignItems: "center",
  },
});
