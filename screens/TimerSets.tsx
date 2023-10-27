import React, { ReactElement, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import TimerSetView from "../components/TimerSetView";
import sharedStyles from "../styles";
import { genid } from "../utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams, TimerSet } from "../types";
import { useNavigation } from "@react-navigation/native";
import { TitleText } from "../shared"
import CreateTimeSetModal from "../modals/CreateTimeSetModal";
import { useTimerSets, useCreateTimerSet } from "../contexts/TimerSetsContext";

export default function TimerSetsScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const timerSets = useTimerSets();
    const createTimerSet = useCreateTimerSet();

    function handleSave(name: string) {
        console.log("Creating new timer set...");
        setModalVisible(false);
        const newTimerSet = {
            id: genid(),
            name: name,
            timers: [],
        }
        createTimerSet(newTimerSet);
    }

    function handleCancel() {
        console.log("Canceling timer set creation.");
        setModalVisible(false);
    }
    
    function onNavigationRequest(timerSet: TimerSet) {
        console.log("Navigating to Timer Set screen.");        
        navigation.navigate("TimerSet", {timerSet});
    }
    
    const timerSetViews: ReactElement[] = [];
    for(let i = 0; i < timerSets.length; i++) {
        timerSetViews.push(
            <TimerSetView
                key={timerSets[i].id}
                timerSet={timerSets[i]}
                onNavigation={onNavigationRequest}
            />
        )
    }

    return (
        <View style={sharedStyles.app}>
            <CreateTimeSetModal visible={modalVisible} onSave={handleSave} onCancel={handleCancel}/>
            <TitleText>Timer Sets</TitleText>
            <ScrollView style={sharedStyles.scrollContainer}>
                {timerSetViews}
            </ScrollView>
            <TouchableOpacity
                onPress={() => {setModalVisible(true)}}
                style={sharedStyles.roundButton}
            >
                <Text style={sharedStyles.plusButton}>+</Text>
            </TouchableOpacity>
        </View>
    )
}
