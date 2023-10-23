import React, { useState } from "react";
import { Modal, TextInput, StyleSheet, View, Button } from "react-native";
import { AvoidingView, SubtitleText } from "../shared";
import sharedStyles from "../styles";

interface CreateTimeSetModalProps {
    visible: boolean;
    onSave: (name: string) => void;
    onCancel: () => void;
}

export default function CreateTimeSetModal({visible, onSave, onCancel}: CreateTimeSetModalProps) {
    const [newName, setNewName] = useState("Timer Set");

    return(
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
        >
            <AvoidingView style={sharedStyles.modalContainer}>
                <SubtitleText>Name of your new Timer Set: </SubtitleText>
                <TextInput 
                    style={[sharedStyles.textBox, styles.textBox]} 
                    value={newName} 
                    onChangeText={setNewName} 
                />
                <View style={sharedStyles.buttonRow}>
                    <Button title="Create" onPress={() => {onSave(newName)}}/>
                    <Button title="Cancel" onPress={onCancel}/>
                </View>
            </AvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    textBox: {
        height: 50,
        width: "100%",
    }
});
