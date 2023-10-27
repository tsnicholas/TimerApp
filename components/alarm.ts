import { Audio } from "expo-av";
import sound from "../assets/Alarm_Clock_Sound_Effect.mp3";

export class Alarm {
    alarm: Audio.Sound;
    
    constructor() {
        this.alarm = new Audio.Sound();
    }

    async playAlarm() {
        console.log("Starting alarm.");
        try {
            await this.alarm.loadAsync(sound);
            await this.alarm.setVolumeAsync(1);
            await this.alarm.playAsync();
        } catch(error) {
          console.error("Unable to play alarm.", error);
        }
    }

    async stopAlarm() {
        console.log("Stopping alarm.");
        try {
            await this.alarm.stopAsync();
            await this.alarm.unloadAsync();
        } catch(error) {
            console.error("Unable to stop alarm.", error);
        }
    }
}
