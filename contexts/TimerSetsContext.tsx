import React, { PropsWithChildren, createContext, useContext, useState } from "react";
import { TimerSet } from "../custom_typings/types";

const TimerSets = createContext<TimerSet[]>([]);
const CreateTimerSet = createContext<(timerSet: TimerSet) => void>(() => {});
const UpdateTimerSet = createContext<(inputTimerSet: TimerSet) => void>(() => {});

export function useTimerSets() {
    return useContext(TimerSets);
}

export function useCreateTimerSet() {
    return useContext(CreateTimerSet);
}

export function useUpdateTimerSet() {
    return useContext(UpdateTimerSet);
}

export function TimerSetsProvider({children}: PropsWithChildren) {
    const [timerSets, setTimerSets] = useState<TimerSet[]>([]);
    
    function createTimerSet(timerSet: TimerSet) {
        console.log("Creating Timer Set...");
        setTimerSets(timerSets.concat([timerSet]));
    }

    function updateTimerSet(inputTimerSet: TimerSet) {
        console.log("Updating Timer Set...");
        setTimerSets(timerSets.map((timerSet) => inputTimerSet.id == timerSet.id ? inputTimerSet : timerSet));
    }

    return (
        <TimerSets.Provider value={timerSets}>
            <CreateTimerSet.Provider value={createTimerSet}>
                <UpdateTimerSet.Provider value={updateTimerSet}>
                    {children}
                </UpdateTimerSet.Provider>
            </CreateTimerSet.Provider>
        </TimerSets.Provider>
    );
}
