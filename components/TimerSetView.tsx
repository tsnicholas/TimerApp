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
            <Text style={styles.title}>{timerSet.name}</Text>
            <TouchableOpacity onPress={() => {onNavigation(timerSet)}}>
                <Text style={styles.navArrow}>{">"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 15,
        width: "100%",
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
        fontSize: 30,
        paddingLeft: 200,
        marginRight: 20,
    }
});
