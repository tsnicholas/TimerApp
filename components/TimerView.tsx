import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, TouchableOpacity, StyleSheet, Image, Vibration } from "react-native";
import sharedStyles from "../styles";
import { Timer } from "../custom_typings/types";
import EditTimerModal from "../modals/EditTimerModal";
import { Alarm } from "../alarm";
import { getRandomColor } from "../utils";

interface TimerProps {
  timer: Timer,
  alarm: Alarm,
  onDataChange: (inputTimer: Timer) => void,
}

export default function TimerView({timer, alarm, onDataChange} : TimerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [controlColor] = useState(getRandomColor());

  useEffect(() => {
    console.log("Timer View Re-rendering...");
    if(timer.length.minute <= 0 && timer.length.second <= 0 && timer.timerTurnedOn) {
      // Prevents this method from being called twice when the TimerSetScreen re-renders.
      onDataChange({
        id: timer.id,
        name: timer.name,
        timerTurnedOn: false,
        length: timer.length,
        duration: timer.duration, 
      });
      alert();
    } else if(timer.timerTurnedOn) {
      const id = setInterval(() => {
        onTimePasses();
      }, 1000);
      return () => {
        clearInterval(id);
      }
    }
  });

  function alert() {
    console.log("Attempting to alert user...");
    alarm.playAlarm();
    Vibration.vibrate(10, true);
    Alert.alert("Timer Finished!", `Time on ${timer.name} is up!`, [
      {
        text: "Ok",
        onPress: (str?: string) => {handleAlertButtonPressed({
          id: timer.id,
          name: timer.name,
          timerTurnedOn: false,
          length: timer.length,
          duration: timer.duration,
        }, str)},
        style: 'default',
        isPreferred: true,
      },
      {
        text: "Reset",
        onPress: (str?: string) => {handleAlertButtonPressed({
          id: timer.id,
          name: timer.name,
          timerTurnedOn: true,
          length: {minute: timer.duration.minute, second: timer.duration.second},
          duration: timer.duration,
        }, str)},
        style: 'default',
        isPreferred: false,
      },
    ]);
  }
  
  function handleAlertButtonPressed(timer: Timer, str?: string) {
    console.log(str === undefined ? "Handling alert button being pressed..." : `Handling ${str} button being pressed...`);
    alarm.stopAlarm();
    Vibration.cancel();
    onDataChange(timer);
  }

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

  function handleSave(timer: Timer) {
    console.log("Saving Changes.");
    onDataChange(timer);
    setModalVisible(false);
  }

  function startTimer() {
    if(timer.length.minute === 0 && timer.length.second === 0) {
      Alert.alert("Error", "Can't start timer with value 00:00.");
      return;
    }

    onDataChange({
      id: timer.id, 
      name: timer.name, 
      timerTurnedOn: true, 
      length: timer.length, 
      duration: timer.duration
    });
  }

  return (
    <View style={[sharedStyles.container, styles.container]}>
      <EditTimerModal timer={timer} visible={modalVisible} onSave={handleSave} onCancel={() => {setModalVisible(false)}}/>
      <TouchableOpacity 
        onPress={() => {setModalVisible(true)}}
      >
        <Text>{timer.name}</Text>
        <Text style={styles.timeFace}>
          {timer.length.minute.toString().padStart(2, "0")}:{timer.length.second.toString().padStart(2, "0")}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          onPress={startTimer}
          style={[sharedStyles.roundButton, {backgroundColor: controlColor}]}
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
          style={[sharedStyles.roundButton, {backgroundColor: controlColor}]}
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
          style={[sharedStyles.roundButton, {backgroundColor: controlColor}]}
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
    justifyContent: "space-between",
  },
  timeFace: {
    fontSize: 45,
    left: 15,
  },
  buttonRow: {
    flexDirection: "row",
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