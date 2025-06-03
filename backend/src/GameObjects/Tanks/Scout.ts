import { TankStats } from "../../interface/Stats";
import CannonBall from "../Projectiles/CannonBall";
import Vector2D from "../../Utils/Vector2D";
import Tank from "./Tank";
import GhostStep from "../../Abilitiese/GhostStep";

class Scout extends Tank {
    constructor(id: string, position: Vector2D) {
        const baseStats: TankStats = {
            health: 25,
            speed: 4,
            turnSpeed: 3,
            shootSpeed: 500, // milliseconds
            baseProjectileDamage: 3,
            ability: new GhostStep(),
        };

        super(id, position, baseStats, CannonBall);
    }
}

export default Scout;
