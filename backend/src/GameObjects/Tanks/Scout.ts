import { TankStats } from "../../interface/Stats";
import Vector2D from "../../Utils/Vector2D";
import Tank from "./Tank";
import GhostStep from "../../Abilitiese/GhostStep";
import Shell from "../Projectiles/Shell";

class Scout extends Tank {
    constructor(id: string, position: Vector2D) {
        const baseStats: TankStats = {
            health: 100,
            speed: 5,
            turnSpeed: 3,
            shootSpeed: 350, // milliseconds
            baseProjectileDamage: 4,
            ability: new GhostStep(),
        };

        super(id, position, baseStats, Shell);
    }
}

export default Scout;
