import Movement from "../../interface/Movement";
import { ProjectileStats } from "../../interface/Stats";
import { CollisionType } from "../../Utils/Enums";
import Vector2D from "../../Utils/Vector2D";
import Projectile from "./Projectile";

class Shell extends Projectile implements Movement {
    constructor() {
        const baseStats: ProjectileStats = {
            damage: 3,
            speed: 5,
            maxTimeToLive: 5,
        };

        super("", new Vector2D(0, 0), CollisionType.polygon, baseStats, 5);
    }

    // Override the update method to implement shell-specific behavior
    update(deltaTime: number): void {
        this.update(deltaTime);
        // Additional shell-specific logic can be added here
    }

    move(): void {}
}

export default Shell;
