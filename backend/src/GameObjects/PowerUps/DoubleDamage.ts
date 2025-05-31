import { PowerUpStats } from "../../interface/Stats";
import Vector2D from "../../Utils/Vector2D";
import Projectile from "../Projectiles/Projectile";
import Tank from "../Tanks/Tank";
import PowerUp from "./PowerUp";

class DoubleDamage extends PowerUp {
    private modifierFn?: (projectile: Projectile) => void;

    constructor(id: string, position: Vector2D) {
        const stats: PowerUpStats = {
            duration: 10000, // 10 seconds
            maxTimeOnGround: 30000, // 30 seconds
        };

        super(id, position, stats);
    }

    applyEffect(tank: Tank): void {
        this.isPickedUp = true;
        this.timeActive = 0;

        this.modifierFn = (projectile: Projectile) => {
            projectile.damage *= 2;
        };

        tank.onShootModifiers.push(this.modifierFn);
    }

    removeEffect(tank: Tank): void {
        if (this.modifierFn) {
            tank.onShootModifiers = tank.onShootModifiers.filter(
                (fn) => fn !== this.modifierFn
            );
        }
    }
}

export default DoubleDamage;
