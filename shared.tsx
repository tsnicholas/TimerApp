import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function FlexFill() {
  return <View style={styles.flexFill} />;
}

interface TitleTextProps {
  children?: string;
}

export function TitleText({ children }: TitleTextProps) {
  return <Text style={styles.titleText}>{children}</Text>;
}

export function SubtitleText({ children }: TitleTextProps) {
  return <Text style={styles.subtitleText}>{children}</Text>;
}

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  titleText: {
    fontSize: 40,
  },
  subtitleText: {
    fontSize: 22,
  },
});
