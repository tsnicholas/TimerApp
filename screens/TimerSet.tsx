import React, { ReactElement, useState, useEffect } from "react";
import { View, ScrollView, Button } from "react-native";
import { RootStackParams, Timer } from "../types";
import TimerView from "../components/TimerView";
import styles from "../styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { genid } from "../utils";

export default function TimerSet() {
    const [timerSet, setTimerSet] = useState<Timer[]>([]);
    const [numOfTimers, setNumberOfTimers] = useState(0);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    
    useEffect(() => {
        const timer = {
            id: genid(), 
            name: `Timer ${numOfTimers}`, 
            timerTurnedOn: false, 
            length: {minute: 0, second: 0}, 
            duration: {minute: 0, second: 0}
        };
        const newValues: Timer[] = timerSet;
        newValues.push(timer);
        setTimerSet(newValues);
    }, [numOfTimers]);

    function onDataChangeRequest(inputTimer: Timer) {
        setTimerSet(
            timerSet.map((timer: Timer) =>
                inputTimer.id == timer.id ? inputTimer : timer
            )
        );
    }

    function onNavigationRequest(timer: Timer) {
        navigation.navigate("TimerMenu", {timer, onDataChangeRequest});
    }

    const timers: ReactElement[] = [];
    for(let i = 0; i < numOfTimers; i++) {
        timers.push(
            <TimerView
                key={`${timerSet[i].id}`}
                timerValues={timerSet[i]}
                onDataChange={onDataChangeRequest}
                onNavigation={onNavigationRequest}
            />
        );
    }
    
    return (
        <View style={styles.app}>
            <ScrollView style={styles.scrollContainer}>
                {timers}
            </ScrollView>
            <View style={{flexDirection: "row"}}>
                <Button title="Add Timer" onPress={() => {setNumberOfTimers(numOfTimers + 1)}}/>
            </View>
        </View>
    )
}
