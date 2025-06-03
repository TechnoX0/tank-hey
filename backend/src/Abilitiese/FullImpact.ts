import Projectile from "../GameObjects/Projectiles/Projectile";
import Tank from "../GameObjects/Tanks/Tank";
import { AbilityStats } from "../interface/Stats";
import Ability from "./Ability";

class FullImpact extends Ability<Tank> {
    private modifierFn: (projectile: Projectile) => void;

    constructor() {
        const stats: AbilityStats = {
            duration: 5000,
            cooldown: 30000,
            name: "Full Impact",
            type: "full-impact",
        };

        super(stats);

        this.modifierFn = (projectile: Projectile) => {
            projectile.hitbox.radius = (projectile.baseStats.radius || 1) * 4;
        };
    }

    activateAbility(target: Tank): void {
        if (this.isActive) return;
        this.isActive = true;

        target.onShootModifiers.push(this.modifierFn);
    }

    deactivateAbility(target: Tank): void {
        const index = target.onShootModifiers.indexOf(this.modifierFn);
        if (index !== -1) {
            target.onShootModifiers.splice(index, 1);
        }
    }
}

export default FullImpact;
