import { PowerUpStats } from "../../interface/Stats";
import Vector2D from "../../Utils/Vector2D";
import Tank from "../Tanks/Tank";
import PowerUp from "./PowerUp";

class SpeedBoost extends PowerUp<Tank> {
    private modifierFn?: (direction: Vector2D) => Vector2D;
    private turnModFn?: (turnSpeed: number) => number;

    constructor(id: string, position: Vector2D) {
        const stats: PowerUpStats = {
            duration: 15000,
            maxTimeOnGround: 30000, // 30 seconds
            name: "Minor Speed Boost",
            type: "speed-boost",
            value: 1.5,
        };

        super(id, position, stats);
    }

    applyEffect(target: Tank): void {
        this.isPickedUp = true;
        this.timeActive = 0;

        this.modifierFn = (direction: Vector2D): Vector2D => {
            return direction.multiply(this.stats.value || 1);
        };

        this.turnModFn = (turnSpeed: number): number => {
            return turnSpeed * (this.stats.value || 1);
        };

        target.movementModifiers.push(this.modifierFn);
        target.rotationModifiers.push(this.turnModFn);
    }

    removeEffect(target: Tank): void {
        if (this.modifierFn) {
            target.movementModifiers = target.movementModifiers.filter(
                (fn) => fn !== this.modifierFn
            );
        }

        if (this.turnModFn) {
            target.rotationModifiers = target.rotationModifiers.filter(
                (fn) => fn !== this.turnModFn
            );
        }
    }
}

export default SpeedBoost;
