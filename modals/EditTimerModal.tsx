import React, { useState } from "react";
import { View, Text, TextInput, Platform, Button, StyleSheet, Modal } from "react-native";
import { Duration, Timer } from "../types";
import { AvoidingView } from "../shared";
import sharedStyles from "../styles";

interface EditTimerProps {
    timer: Timer,
    visible: boolean,
    onSave: (timer: Timer) => void,
    onCancel: () => void,
}

export default function EditTimerModal({ timer, visible, onSave, onCancel}: EditTimerProps) {
    const [timerName, setTimerName] = useState(timer.name);
    const [duration, setTimerDuration] = useState<Duration>(timer.duration);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
        >
            <AvoidingView style={sharedStyles.modalContainer}>
                <View style={styles.timerInputContainer}>
                    <Text style={styles.timerInputLabel}>Name: </Text>
                    <TextInput 
                        style={[sharedStyles.textBox, styles.timerInputTextBox]}
                        value={timerName} 
                        onChangeText={(value) => {setTimerName(value)}}
                    />
                </View>
                <View style={styles.timerInputContainer}>
                    <Text style={styles.timerInputLabel}>Minute: </Text>
                    <TextInput 
                        style={[sharedStyles.textBox, styles.timerInputTextBox]}
                        value={duration.minute.toString().padStart(2, "0")} 
                        onChangeText={(value) => {setTimerDuration({minute: Number(value), second: duration.second})}}
                        keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}   
                    />
                </View>
                <View style={styles.timerInputContainer}>
                    <Text style={styles.timerInputLabel}>Second: </Text>
                    <TextInput
                        style={[sharedStyles.textBox, styles.timerInputTextBox]}
                        value={duration.second.toString().padStart(2, "0")}
                        onChangeText={(value) => {setTimerDuration({minute: duration.minute, second: Number(value)})}}
                        keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}
                    />
                </View>
                <View style={sharedStyles.buttonRow}>
                    <Button title="Confirm" onPress={() => {onSave({
                        id: timer.id, 
                        name: timerName, 
                        timerTurnedOn: false, 
                        duration: duration, 
                        length: {minute: duration.minute, second: duration.second}
                    })}}/>
                    <Button title="Cancel" onPress={onCancel}/>
                </View>
            </AvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
    },
});
