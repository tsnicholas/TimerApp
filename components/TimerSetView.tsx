import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from "react-native";
import { TimerSet } from "../types";

interface TimerSetProps {
    timerSet: TimerSet,
    onNameChange: (timerSet: TimerSet) => void,
    onNavigation: (timerSet: TimerSet) => void,
}

export default function TimerSetView({timerSet, onNameChange, onNavigation}: TimerSetProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {onNavigation(timerSet)}}>
                <TextInput style={styles.title} onChangeText={(value) => {onNameChange({
                    id: timerSet.id, 
                    name: value, 
                    timers: timerSet.timers})}}
                >{timerSet.name}</TextInput>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {onNavigation(timerSet)}}>
                <Text style={styles.navArrow}>{">"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 10,
        gap: 5,
        margin: 10,
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
