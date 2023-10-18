import React, { ReactElement, useState } from "react";
import { View, ScrollView, Button } from "react-native";
import TimerSetView from "../components/TimerSetView";
import styles from "../styles";
import { genid } from "../utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams, TimerSet } from "../types";
import { useNavigation } from "@react-navigation/native";

export default function TimerSets() {
    const [numberOfTimerSets, setNumberOfTimerSets] = useState(0);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    
    function onNavigationRequest(timerSet: TimerSet) {
        navigation.navigate("TimerSet", {timerSet});
    }
    
    const timerSets: ReactElement[] = [];
    for(let i = 0; i < numberOfTimerSets; i++) {
        timerSets.push(
            <TimerSetView
                key={`TimerSet ${i}`}
                timerSet={{id: genid(), name: `TimerSet ${i}`, timers: []}}
                onNavigation={onNavigationRequest}
            />
        )
    }

    return (
        <View style={styles.app}>
            <ScrollView style={styles.scrollContainer}>
                {timerSets}
            </ScrollView>
            <Button title="Add TimerSet" onPress={() => {setNumberOfTimerSets(numberOfTimerSets + 1)}}/>
        </View>
    )
}
