// src/utils/SoundManager.ts
export class SoundManager {
    private static cache: Map<string, HTMLAudioElement> = new Map();
    private static loops: Map<string, HTMLAudioElement> = new Map();

    static play(path: string, volume: number = 0.5) {
        let sound = this.cache.get(path);

        if (!sound) {
            sound = new Audio(path);
            sound.volume = volume;
            this.cache.set(path, sound);
        } else {
            sound.currentTime = 0; // rewind to start for instant replay
        }

        // Clone the audio so overlapping plays are allowed
        const clone = sound.cloneNode(true) as HTMLAudioElement;
        clone.volume = volume;
        clone.play().catch((e) => console.warn("Failed to play sound:", e));
    }

    static loop(path: string, volume: number = 1.0) {
        if (this.loops.has(path)) return;

        const sound = new Audio(path);
        sound.loop = true;
        sound.volume = volume;
        sound.play().catch(() => {});
        this.loops.set(path, sound);
    }

    static stopLoop(path: string) {
        const sound = this.loops.get(path);
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
            this.loops.delete(path);
        }
    }
}
