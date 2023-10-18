import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "../styles";
import { TimerSet } from "../types";
import { TitleText } from "../shared";

interface TimerSetProps {
    timerSet: TimerSet,
    onNavigation: (timerSet: TimerSet) => void,
}

export default function TimerSetView({timerSet, onNavigation}: TimerSetProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {onNavigation(timerSet)}}>
                <View style={styles.container}>
                    <TitleText>{timerSet.name}</TitleText>
                </View>
            </TouchableOpacity>
        </View>
    )
}
