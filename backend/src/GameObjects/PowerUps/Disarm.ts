import { PowerUpStats } from "../../interface/Stats";
import Vector2D from "../../Utils/Vector2D";
import Tank from "../Tanks/Tank";
import PowerUp from "./PowerUp";

class Disarm extends PowerUp<Tank> {
    constructor(id: string, position: Vector2D) {
        const stats: PowerUpStats = {
            duration: 5000,
            maxTimeOnGround: 30000, // 30 seconds
            name: "Disarm",
            type: "disarm",
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

export default Disarm;
