import { Audio } from "expo-av";
import sound from "./assets/Alarm_Clock_Sound_Effect.mp3";

export class Alarm {
    alarm: Audio.Sound;
    
    constructor() {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            playThroughEarpieceAndroid: true,
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
        });
        this.alarm = new Audio.Sound();
    }

    async loadAlarm() {
        console.log("Loading alarm.");
        try {
            await this.alarm.loadAsync(sound);
            await this.alarm.setVolumeAsync(1);
        } catch(error) {
            console.error("Unable to load alarm.", error);
        }
    }

    async playAlarm() {
        console.log("Starting alarm.");
        try {
            await this.alarm.playAsync();
        } catch(error) {
          console.error("Unable to play alarm.", error);
        }
    }

    async stopAlarm() {
        console.log("Stopping alarm.");
        try {
            await this.alarm.stopAsync();
        } catch(error) {
            console.error("Unable to stop alarm.", error);
        }
    }
}
