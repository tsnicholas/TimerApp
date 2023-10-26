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

export default function TimerSets() {
    const [timerSets, setTimerSets] = useState<TimerSet[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    function handleSave(name: string) {
        setModalVisible(false);
        const newTimerSet = {
            id: genid(),
            name: name,
            timers: [],
        }
        const newValues: TimerSet[] = timerSets;
        newValues.push(newTimerSet);
        setTimerSets(newValues);
    }

    function handleCancel() {
        setModalVisible(false);
    }
    
    function onNavigationRequest(timerSet: TimerSet) {
        navigation.navigate("TimerSet", {timerSet});
    }
    
    const timerSetViews: ReactElement[] = [];
    for(let i = 0; i < timerSets.length; i++) {
        timerSetViews.push(
            <TimerSetView
                key={timerSets[i].id}
                timerSet={{id: timerSets[i].id, name: timerSets[i].name, timers: timerSets[i].timers}}
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
