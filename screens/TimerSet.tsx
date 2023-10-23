import React, { ReactElement, useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { RootStackParams, Timer } from "../types";
import TimerView from "../components/TimerView";
import sharedStyles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { genid } from "../utils";

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
        <View style={sharedStyles.app}>
            <Text style={timerSetStyles.headerText}>{route.params.timerSet.name}</Text>
            <ScrollView style={timerSetStyles.timerViewContainer}>
                {timers}
            </ScrollView>
            <TouchableOpacity
                onPress={() => {setNumberOfTimers(numOfTimers + 1)}}
                style={sharedStyles.roundButton}
            >
                <Text style={sharedStyles.plusButton}>+</Text>
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
