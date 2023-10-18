import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, Alert, TouchableOpacity } from "react-native";
import styles from "../styles";
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
      <Text>{timer.name}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {onNavigation({
          id: timer.id, 
          name: timer.name, 
          timerTurnedOn: timer.timerTurnedOn, 
          length: timer.length,
          duration: timer.duration,
          });}}>
          <Text style={{fontSize: 30}}>
            {timer.length.minute.toString().padStart(2, "0")}:{timer.length.second.toString().padStart(2, "0")}
          </Text>
        </TouchableOpacity>
        <Button title='start' onPress={startTimer}/>
        <Button title='pause' onPress={() => {onDataChange({
          id: timer.id, 
          name: timer.name, 
          timerTurnedOn: false, 
          length: timer.length,
          duration: timer.duration,
        })}}/>
        <Button title='reset' onPress={() => {onDataChange({
          id: timer.id, 
          name: timer.name, 
          timerTurnedOn: timer.timerTurnedOn, 
          length: {minute: timer.duration.minute, second: timer.duration.second},
          duration: timer.duration,
        })}}/>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}
