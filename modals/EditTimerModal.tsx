import React, { useState } from "react";
import { View, Text, TextInput, Platform, Button, StyleSheet, Modal, Alert } from "react-native";
import { Duration, Timer } from "../custom_typings/types";
import { AvoidingView } from "../shared";
import sharedStyles from "../styles";

const KEYBOARD_TYPE = Platform.OS == "android" ? "numeric" : "number-pad";

interface EditTimerProps {
    timer: Timer,
    visible: boolean,
    onSave: (timer: Timer) => void,
    onCancel: () => void,
}

export default function EditTimerModal({ timer, visible, onSave, onCancel}: EditTimerProps) {
    const [timerName, setTimerName] = useState(timer.name);
    const [duration, setTimerDuration] = useState<Duration>(timer.duration);

    function validation() {
        if(IsInvalidNumbers()) {
            Alert.alert("Invalid Input", "Please enter a valid number.");
            return;
        }
        if(timerName === "") {
            Alert.alert("Invalid Input", "Please enter a name.");
            return;
        }
        onSave({
            id: timer.id, 
            name: timerName, 
            timerTurnedOn: false, 
            duration: duration, 
            length: {minute: duration.minute, second: duration.second}
        });
    }

    function IsInvalidNumbers() {
        const errorFlags = [
            duration.minute < 0,
            duration.second < 0,
            duration.second > 60,
            duration.second == 0 && duration.minute == 0,
            Number.isNaN(duration.minute),
            Number.isNaN(duration.second)
        ];
        
        for(const flag of errorFlags) {
            if(flag) {
                return true;
            }
        }
        return false;
      }

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
                        keyboardType={KEYBOARD_TYPE}   
                    />
                </View>
                <View style={styles.timerInputContainer}>
                    <Text style={styles.timerInputLabel}>Second: </Text>
                    <TextInput
                        style={[sharedStyles.textBox, styles.timerInputTextBox]}
                        value={duration.second.toString().padStart(2, "0")}
                        onChangeText={(value) => {setTimerDuration({minute: duration.minute, second: Number(value)})}}
                        keyboardType={KEYBOARD_TYPE}
                    />
                </View>
                <View style={sharedStyles.buttonRow}>
                    <Button title="Save" onPress={validation}/>
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
        justifyContent: "space-between",
        padding: 10,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 15,
    },
    timerInputLabel: {
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
    },
    timerInputTextBox: {
        height: 40,
        width: "55%",
        textAlign: "center",
        marginRight: 10,
    },
});
