import Projectile from "../GameObjects/Projectiles/Projectile";
import Tank from "../GameObjects/Tanks/Tank";
import { AbilityStats } from "../interface/Stats";
import Ability from "./Ability";

class IronFocus extends Ability<Tank> {
    constructor() {
        const stats: AbilityStats = {
            duration: 10000,
            cooldown: 45000,
            name: "Iron Focux",
            type: "iron-focus",
        };

        super(stats);
    }

    activateAbility(target: Tank): void {
        if (this.isActive) return;
        this.isActive = true;

        const shootModFn = (projectile: Projectile) => {
            projectile.damage *= 2;

            const index = target.onShootModifiers.indexOf(shootModFn);
            if (index !== -1) {
                target.onShootModifiers.splice(index, 1);
            }
        };

        target.inputBlockers.add("invulnerability");
        target.onShootModifiers.push(shootModFn);
    }

    deactivateAbility(target: Tank): void {
        target.inputBlockers.delete("invulnerability");

        target.onShootModifiers = target.onShootModifiers.filter(
            (fn) => fn.name !== ""
        );
    }
}

export default IronFocus;
