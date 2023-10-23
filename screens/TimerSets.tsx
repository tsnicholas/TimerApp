import React, { ReactElement, useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import TimerSetView from "../components/TimerSetView";
import sharedStyles from "../styles";
import { genid } from "../utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams, TimerSet } from "../types";
import { useNavigation } from "@react-navigation/native";
import { TitleText } from "../shared"

export default function TimerSets() {
    const [numberOfTimerSets, setNumberOfTimerSets] = useState(0);
    const [timerSets, setTimerSets] = useState<TimerSet[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    
    function onNameChange(inputTimerSet: TimerSet) {
        setTimerSets(
            timerSets.map((timerSet) => 
                inputTimerSet.id == timerSet.id ? inputTimerSet : timerSet
            )
        )
    }

    useEffect(() => {
        const timerSet = {
            id: genid(),
            name: `TimerSet ${numberOfTimerSets}`,
            timers: [],
        };
        const newValues: TimerSet[] = timerSets;
        newValues.push(timerSet);
        setTimerSets(newValues);
    }, [numberOfTimerSets]);
    
    function onNavigationRequest(timerSet: TimerSet) {
        navigation.navigate("TimerSet", {timerSet});
    }
    
    const timerSetViews: ReactElement[] = [];
    for(let i = 0; i < numberOfTimerSets; i++) {
        timerSetViews.push(
            <TimerSetView
                key={`TimerSet ${i}`}
                timerSet={{id: timerSets[i].id, name: timerSets[i].name, timers: timerSets[i].timers}}
                onNameChange={onNameChange}
                onNavigation={onNavigationRequest}
            />
        )
    }

    return (
        <View style={sharedStyles.app}>
            <TitleText>Timer Sets</TitleText>
            <ScrollView style={sharedStyles.scrollContainer}>
                {timerSetViews}
            </ScrollView>
            <TouchableOpacity
                onPress={() => {setNumberOfTimerSets(numberOfTimerSets + 1)}}
                style={sharedStyles.roundButton}
            >
                <Text style={sharedStyles.plusButton}>+</Text>
            </TouchableOpacity>
        </View>
    )
}
