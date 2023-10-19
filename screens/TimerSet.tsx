import React, { ReactElement, useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { RootStackParams, Timer } from "../types";
import TimerView from "../components/TimerView";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { genid } from "../utils";
import { SubtitleText } from "../shared";

type Props = NativeStackScreenProps<RootStackParams, "TimerSet">;

export default function TimerSet({navigation, route}: Props) {
    const [timerSet, setTimerSet] = useState<Timer[]>([]);
    const [numOfTimers, setNumberOfTimers] = useState(0);
    
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
        console.log("Number of Timers: " + numOfTimers);
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
            <SubtitleText>{route.params?.timerSet.name}</SubtitleText>
            <ScrollView style={styles.scrollContainer}>
                {timers}
            </ScrollView>
            <TouchableOpacity
                onPress={() => {setNumberOfTimers(numOfTimers + 1)}}
                style={styles.roundButton}
            >
                <Text style={styles.plusButton}>+</Text>
            </TouchableOpacity>
        </View>
    )
}
