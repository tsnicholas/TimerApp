import React from "react";
import { TouchableOpacity, StyleSheet, Text, TextInput } from "react-native";
import { TimerSet } from "../types";
import { AvoidingView } from "../shared";
import sharedStyles from "../styles";

interface TimerSetProps {
    timerSet: TimerSet,
    onNameChange: (timerSet: TimerSet) => void,
    onNavigation: (timerSet: TimerSet) => void,
}

export default function TimerSetView({timerSet, onNameChange, onNavigation}: TimerSetProps) {
    return (
        <AvoidingView style={[sharedStyles.container, styles.container]}>
            <TouchableOpacity onPress={() => {onNavigation(timerSet)}}>
                <TextInput style={styles.title} onChangeText={(value) => {onNameChange({
                    id: timerSet.id, 
                    name: value, 
                    timers: timerSet.timers})}}
                >
                    {timerSet.name}
                </TextInput>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {onNavigation(timerSet)}}>
                <Text style={styles.navArrow}>{">"}</Text>
            </TouchableOpacity>
        </AvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    title: {
        flex: 1,
        color: "#5A5A5A",
        fontSize: 22,
        borderColor: "black",
        borderWidth: 2,
    },
    navArrow: {
        flex: 1,
        color: "#5A5A5A",
        fontSize: 22,
    }
});
