import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { TimerSet } from "../custom_typings/types";
import sharedStyles from "../styles";

interface TimerSetProps {
    timerSet: TimerSet,
    onNavigation: (timerSet: TimerSet) => void,
}

export default function TimerSetView({timerSet, onNavigation}: TimerSetProps) {
    return (
        <View style={[sharedStyles.container, styles.container]}>
            <View style={[sharedStyles.container]}>
                <Text style={styles.title}>{timerSet.name}</Text>
                <Text style={styles.date}>{timerSet.lastUsed}</Text>
            </View>
            <TouchableOpacity onPress={() => {onNavigation(timerSet)}}>
                <Text style={styles.navArrow}>{">"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 5,
        width: "100%",
        justifyContent: "space-evenly",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    title: {
        flex: 1,
        fontSize: 22,
    },
    date: {
        fontSize: 18,
        color: "#5A5A5A"
    },
    navArrow: {
        flex: 1,
        color: "#5A5A5A",
        fontSize: 30,
        marginRight: 20,
    }
});
