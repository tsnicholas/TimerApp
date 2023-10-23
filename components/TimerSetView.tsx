import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { TimerSet } from "../types";
import sharedStyles from "../styles";

interface TimerSetProps {
    timerSet: TimerSet,
    onNavigation: (timerSet: TimerSet) => void,
}

export default function TimerSetView({timerSet, onNavigation}: TimerSetProps) {
    return (
        <View style={sharedStyles.container}>
            <TouchableOpacity onPress={() => {onNavigation(timerSet)}}>
                <View style={styles.container}>
                    <Text style={styles.title}>{timerSet.name}</Text>
                    <Text style={styles.navArrow}>{">"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 20,
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
    },
    navArrow: {
        flex: 1,
        color: "#5A5A5A",
        fontSize: 22,
    }
});
