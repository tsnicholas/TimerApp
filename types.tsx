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
    name: string;
    timers: Timer[];
}

export type RootStackParams = {
    TimerSet: {
        timerSet: TimerSet
    };

    TimerMenu: {
        timer: Timer,
        onDataChangeRequest: (timer: Timer) => void,
    };
}
