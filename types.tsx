export interface Duration {
    minute: number;
    second: number;
}

export interface Timer {
    id: string;
    name: string;
    timerTurnedOn: boolean;
    length: Duration;
    duration: Duration;
}

export interface TimerSet {
    id: string;
    name: string;
    timers: Timer[];
}

export type RootStackParams = {
    TimerSets: undefined;
    
    TimerSet: {
        timerSet: TimerSet
    };
}
