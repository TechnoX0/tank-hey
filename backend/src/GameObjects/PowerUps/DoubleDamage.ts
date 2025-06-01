import { PowerUpStats } from "../../interface/Stats";
import Vector2D from "../../Utils/Vector2D";
import Projectile from "../Projectiles/Projectile";
import Tank from "../Tanks/Tank";
import PowerUp from "./PowerUp";

class DoubleDamage extends PowerUp<Tank> {
    private modifierFn?: (projectile: Projectile) => void;

    constructor(id: string, position: Vector2D) {
        const stats: PowerUpStats = {
            duration: 10000, // 10 seconds
            maxTimeOnGround: 30000, // 30 seconds
            value: 2,
        };

        super(id, position, stats);
    }

    applyEffect(target: Tank): void {
        this.isPickedUp = true;
        this.timeActive = 0;

        this.modifierFn = (projectile: Projectile) => {
            projectile.damage *= 2;
        };

        target.onShootModifiers.push(this.modifierFn);
    }

    removeEffect(target: Tank): void {
        if (this.modifierFn) {
            target.onShootModifiers = target.onShootModifiers.filter(
                (fn) => fn !== this.modifierFn
            );
        }
    }
}

export default DoubleDamage;
