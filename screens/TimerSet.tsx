import React, { ReactElement, useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { RootStackParams, Timer } from "../custom_typings/types";
import TimerView from "../components/TimerView";
import sharedStyles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { genID } from "../utils";
import { useUpdateTimerSet } from "../contexts/TimerSetsContext";
import { Alarm } from "../alarm";

type Props = NativeStackScreenProps<RootStackParams, "TimerSet">;

export default function TimerSetScreen({route}: Props) {
    const [timerSet, setTimerSet] = useState<Timer[]>(route.params.timerSet.timers);
    const timers: ReactElement[] = [];
    const [alarm] = useState(new Alarm());
    const updateTimerSet = useUpdateTimerSet();
    let numOfTimers = timerSet.length;

    useEffect(() => {
        alarm.loadAlarm();
    }, []);
    
    useEffect(() => {
        console.log("Timer Set Screen Re-rendering...");
        const currentDate = new Date();
        updateTimerSet({
            id: route.params.timerSet.id, 
            name: route.params.timerSet.name, 
            lastUsed: `Last Used: ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`, 
            timers: timerSet
        });
    }, [timerSet]);

    function addTimer() {
        console.log("Creating a new timer...");
        const timer = {
            id: genID(), 
            name: `Timer ${numOfTimers}`, 
            timerTurnedOn: false, 
            length: {minute: 0, second: 0}, 
            duration: {minute: 0, second: 0}
        };
        // This will trigger a re-render unlike pushing or assigning a new array.
        setTimerSet(timerSet.concat([timer]));
        console.log("Timer Created. Number of Timers: " + ++numOfTimers);
    }

    function onDataChangeRequest(inputTimer: Timer) {
        console.log("Timer data is being updated.");
        setTimerSet(
            timerSet.map((timer: Timer) =>
                inputTimer.id == timer.id ? inputTimer : timer
            )
        );
    }
    
    for(const timer of timerSet) {
        timers.push(
            <TimerView
                key={`${timer.id}`}
                timer={timer}
                alarm={alarm}
                onDataChange={onDataChangeRequest}
            />
        );
    }
    
    return (
        <View style={sharedStyles.app}>
            <Text style={timerSetStyles.headerText}>{route.params.timerSet.name}</Text>
            <ScrollView style={timerSetStyles.timerViewContainer}>
                {timers}
            </ScrollView>
            <TouchableOpacity
                onPress={() => {addTimer()}}
                style={[sharedStyles.roundButton, sharedStyles.plusButton]}
            >
                <Text style={sharedStyles.plusIcon}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const timerSetStyles = StyleSheet.create({
    timerViewContainer: {
        flex: 1,
        alignSelf: "flex-start", 
        width: "100%",
        gap: 5,
    },
    headerText: {
        width: "100%",
        textAlign: "center",
        fontSize: 50,
        fontWeight: "bold",
        borderBottomColor: "black",
        borderBottomWidth: 2,
    }
});
