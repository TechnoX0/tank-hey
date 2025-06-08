import Projectile from "../GameObjects/Projectiles/Projectile";
import Tank from "../GameObjects/Tanks/Tank";
import { AbilityStats } from "../interface/Stats";
import Vector2D from "../Utils/Vector2D";
import Ability from "./Ability";

class GhostStep extends Ability<Tank> {
    private modifierFn: (direction: Vector2D) => Vector2D;

    constructor() {
        const stats: AbilityStats = {
            duration: 7000,
            cooldown: 25000,
            name: "Ghost Step",
            type: "ghost-step",
        };

        super(stats);

        this.modifierFn = (direction: Vector2D): Vector2D => {
            return direction.multiply(2);
        };
    }

    activateAbility(target: Tank): void {
        if (this.isActive) return;
        this.isActive = true;

        target.isVisible = false;
        target.movementModifiers.push(this.modifierFn);
    }

    deactivateAbility(target: Tank): void {
        this.isActive = false;
        target.isVisible = true;
        target.movementModifiers = target.movementModifiers.filter(
            (fn) => fn !== this.modifierFn
        );
    }
}

export default GhostStep;
