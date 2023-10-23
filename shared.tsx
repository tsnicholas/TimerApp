import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ViewProps } from "react-native";

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

export function AvoidingView({ children, style }: ViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[styles.avoidingView, style]}
    >
      {children}
    </KeyboardAvoidingView>
  );
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
  avoidingView: {
    flex: 1
  }
});
