import GameObject from "../GameObjects/GameObject";
import { AbilityStats } from "../interface/Stats";

abstract class Ability<T extends GameObject> {
    public stats: AbilityStats;
    public timeActive: number = 0;
    public uses: number = 1;
    public isActive: boolean = false;
    public isExpired: boolean = false;

    constructor(stats: AbilityStats) {
        this.stats = stats;
    }

    update(deltaTime: number): void {
        if (this.isActive) {
            this.timeActive += deltaTime / 60;

            if (this.timeActive >= this.stats.duration / 1000) {
                this.isActive = false;
                this.timeActive = 0;
            }
        }
    }

    abstract activateAbility(target: T): void;
    abstract deactivateAbility(target: T): void;
}

export default Ability;
