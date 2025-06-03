import Projectile from "../GameObjects/Projectiles/Projectile";
import Tank from "../GameObjects/Tanks/Tank";
import { AbilityStats } from "../interface/Stats";
import Ability from "./Ability";

class Fortess extends Ability<Tank> {
    private modifierFn: (damage: number) => number;
    private shieldHealth: number = 50;

    constructor() {
        const stats: AbilityStats = {
            duration: 8000,
            cooldown: 30000,
            name: "Fortess",
            type: "fortess",
        };

        super(stats);

        this.modifierFn = (damage: number): number => {
            let returnDamage = 0;
            this.shieldHealth -= damage;

            if (this.shieldHealth - damage < 0) {
                returnDamage = this.shieldHealth - damage;
            }

            if (this.shieldHealth <= 0) {
                this.isActive = false;
            }

            console.log(returnDamage);

            return returnDamage;
        };
    }

    activateAbility(target: Tank): void {
        if (this.isActive) return;
        this.isActive = true;

        target.onTakeDamage.push(this.modifierFn);
    }

    deactivateAbility(target: Tank): void {
        this.isActive = false;
        target.onTakeDamage = target.onTakeDamage.filter(
            (fn) => fn !== this.modifierFn
        );
    }
}

export default Fortess;
