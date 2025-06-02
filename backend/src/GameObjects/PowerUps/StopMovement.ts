import { PowerUpStats } from "../../interface/Stats";
import Vector2D from "../../Utils/Vector2D";
import Tank from "../Tanks/Tank";
import PowerUp from "./PowerUp";

class StopMovement extends PowerUp<Tank> {
    constructor(id: string, position: Vector2D) {
        const stats: PowerUpStats = {
            duration: 3000,
            maxTimeOnGround: 30000, // 30 seconds
            name: "Stop Movement",
            type: "stop-movement",
        };

        super(id, position, stats);
    }

    applyEffect(target: Tank): void {
        this.isPickedUp = true;
        this.timeActive = 0;
        target.inputBlockers.add(this.stats.type);
    }

    removeEffect(target: Tank): void {
        target.inputBlockers.delete(this.stats.type);
    }
}

export default StopMovement;
