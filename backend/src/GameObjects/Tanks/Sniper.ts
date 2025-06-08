import Vector2D from "../../Utils/Vector2D";
import Tank from "./Tank";
import { TankStats } from "../../interface/Stats";
import Shell from "../Projectiles/Shell";
import IronFocus from "../../Abilitiese/IronFocus";

class Sniper extends Tank {
    constructor(id: string, position: Vector2D) {
        const baseStats: TankStats = {
            health: 80,
            speed: 2.5,
            turnSpeed: 1.75,
            shootSpeed: 1000, // milliseconds
            baseProjectileDamage: 18,
            ability: new IronFocus(),
        };

        super(id, position, baseStats, Shell);
    }
}

export default Sniper;
