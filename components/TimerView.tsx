import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, TouchableOpacity, StyleSheet, Image } from "react-native";
import sharedStyles from "../styles";
import { Timer } from "../types";

interface TimerProps {
  timerValues: Timer,
  onDataChange: (inputTimer: Timer) => void,
  onNavigation: (inputTimer: Timer) => void,
}

export default function TimerView({timerValues: timer, onDataChange, onNavigation} : TimerProps) {
  useEffect(() => {
    if(timer.length.minute <= 0 && timer.length.second <= 0 && timer.timerTurnedOn) {
      Alert.alert(`Time on ${timer.name} is up!`);
      onDataChange({
        id: timer.id, 
        name: timer.name, 
        timerTurnedOn: false, 
        length: timer.length,
        duration: timer.duration
      });
    } else if(timer.timerTurnedOn) {
      const id = setInterval(() => {
        onTimePasses();
      }, 1000);
      return () => {
        clearInterval(id);
      }
    }
  });

  function onTimePasses() {
    const length = timer.length;
    if(length.second <= 0) {
      length.minute--;
      length.second = 59;
    } else {
      length.second--;
    }
    onDataChange({id: timer.id, name: timer.name, timerTurnedOn: timer.timerTurnedOn, length: length, duration: timer.duration});
  }

  function startTimer() {
    if(IsValidNumbers()) {
      Alert.alert("Invalid Input!");
      return;
    }
    onDataChange({id: timer.id, name: timer.name, timerTurnedOn: true, length: timer.length, duration: timer.duration});
  }
  
  function IsValidNumbers() {
    const length = timer.length;
    return length.minute < 0 || Number.isNaN(length.minute) || length.second < 0 || length.second > 60 || Number.isNaN(length.second);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => {onNavigation({
          id: timer.id, 
          name: timer.name, 
          timerTurnedOn: timer.timerTurnedOn, 
          length: timer.length,
          duration: timer.duration,
        });}}
      >
        <Text>{timer.name}</Text>
        <Text style={styles.timeFace}>
          {timer.length.minute.toString().padStart(2, "0")}:{timer.length.second.toString().padStart(2, "0")}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          onPress={startTimer}
          style={sharedStyles.roundButton}
        >
          <Image
            style={styles.playIcon}
            source={require("../assets/play_icon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {onDataChange({
            id: timer.id, 
            name: timer.name, 
            timerTurnedOn: false, 
            length: timer.length,
            duration: timer.duration,
          })}}
          style={sharedStyles.roundButton}
        >
          <View style={styles.pauseIcon}>
            <View style={styles.pauseStrip}></View>
            <View style={styles.pauseStrip}></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {onDataChange({
            id: timer.id, 
            name: timer.name, 
            timerTurnedOn: timer.timerTurnedOn, 
            length: {minute: timer.duration.minute, second: timer.duration.second},
            duration: timer.duration,
          })}}
          style={sharedStyles.roundButton}
        >
          <Image 
            style={styles.resetIcon}
            source={require("../assets/reset_icon.png")}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "black",
    paddingHorizontal: 10,
    gap: 5,
  },
  timeFace: {
    fontSize: 45,
    left: 15,
  },
  buttonRow: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "flex-end", 
    alignItems: "center",
    gap: 5,
  },
  playIcon: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
  pauseIcon: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
  },
  pauseStrip: {
    width: 6,
    height: 20,
    backgroundColor: "white",
    alignSelf: "center",
  },
  resetIcon: {
    width: 50,
    height: 50,
    alignSelf: "center",
  }
})