import React, { useState } from "react";
import { View, Text, TextInput, Platform, Button, StyleSheet } from "react-native";
import { Duration, RootStackParams } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AvoidingView } from "../shared";
import sharedStyles from "../styles";

type Props = NativeStackScreenProps<RootStackParams, "TimerMenu">;

export default function TimerMenu({ route, navigation }: Props) {
    const [timerName, setTimerName] = useState(route.params.timer.name);
    const [duration, setTimerDuration] = useState<Duration>(route.params.timer.length);

    function handleConfirmation() {
        console.log("Handling Confirmation...");
        route.params.onDataChangeRequest({
            id: route.params.timer.id, 
            name: timerName, 
            timerTurnedOn: false, 
            length: duration, 
            duration: {minute: duration.minute, second: duration.second},
        });
        navigation.goBack();
        console.log("Confirmation Complete!");
    }

    return (
        <AvoidingView style={[sharedStyles.container, styles.container]}>
            <View style={styles.timerInputContainer}>
                <Text style={styles.timerInputLabel}>Name: </Text>
                <TextInput 
                    style={[sharedStyles.textBox, styles.timerInputTextBox]}
                    defaultValue={timerName} 
                    onChangeText={(value) => {setTimerName(value)}}
                />
            </View>
            <View style={styles.timerInputContainer}>
                <Text style={styles.timerInputLabel}>Minute: </Text>
                <TextInput 
                    style={[sharedStyles.textBox, styles.timerInputTextBox]}
                    defaultValue={duration.minute.toString().padStart(2, "0")} 
                    onChangeText={(value) => {setTimerDuration({minute: Number(value), second: duration.second})}}
                    keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}   
                />
            </View>
            <View style={styles.timerInputContainer}>
                <Text style={styles.timerInputLabel}>Second: </Text>
                <TextInput
                    style={[sharedStyles.textBox, styles.timerInputTextBox]}
                    defaultValue={duration.second.toString().padStart(2, "0")}
                    onChangeText={(value) => {setTimerDuration({minute: duration.minute, second: Number(value)})}}
                    keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}
                />
            </View>
            <Button title="Confirm" onPress={handleConfirmation}/>
        </AvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
    },
    timerInputContainer: {
        flexDirection: "row",
        width: "100%",
        gap: 60,
        padding: 10,
        margin: 5,
        backgroundColor: "white",
        borderRadius: 15,
    },
    timerInputLabel: {
        width: "20%",
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
    },
    timerInputTextBox: {
        alignSelf: "flex-end",
        alignContent: "flex-end",
        justifyContent: "flex-end",
        height: 40,
        width: "60%",
        textAlign: "center",
    }
});
