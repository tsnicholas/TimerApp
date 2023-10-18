import React, { useState } from "react";
import { View, Text, TextInput, Platform, KeyboardAvoidingView, Button } from "react-native";
import { Duration, RootStackParams } from "../types";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParams, "TimerMenu">;

export default function TimerMenu({ route, navigation }: Props) {
    const [timerName, setTimerName] = useState(route.params.timer.name);
    const [duration, setTimerDuration] = useState<Duration>(route.params.timer.length);

    function handleConfirmation() {
        route.params.onDataChangeRequest({
            id: route.params.timer.id, 
            name: timerName, 
            timerTurnedOn: false, 
            length: duration, 
            duration: {minute: duration.minute, second: duration.second},
        })
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.avoidingView}>
            <View style={styles.TimerInput}>
                <Text>Name: </Text>
                <TextInput 
                    defaultValue={timerName} 
                    onChangeText={(value) => {setTimerName(value)}}
                />
            </View>
            <View style={styles.TimerInput}>
                <Text>Minute: </Text>
                <TextInput 
                    defaultValue={duration.minute.toString()} 
                    onChangeText={(value) => {setTimerDuration({minute: Number(value), second: duration.second})}}
                    keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}   
                />
            </View>
            <View style={styles.TimerInput}>
                <Text>Second: </Text>
                <TextInput
                    defaultValue={duration.second.toString()}
                    onChangeText={(value) => {setTimerDuration({minute: duration.minute, second: Number(value)})}}
                    keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}
                />
            </View>
            <Button title="Confirm" onPress={() => {handleConfirmation}}/>
        </KeyboardAvoidingView>
    );
}
