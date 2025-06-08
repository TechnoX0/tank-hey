import { TankStats } from "../../interface/Stats";
import CannonBall from "../Projectiles/CannonBall";
import Vector2D from "../../Utils/Vector2D";
import Tank from "./Tank";
import ExpandProjectile from "../../Abilitiese/FullImpact";

class Juggernaut extends Tank {
    constructor(id: string, position: Vector2D) {
        const baseStats: TankStats = {
            health: 200,
            speed: 1,
            turnSpeed: 1.5,
            shootSpeed: 1800, // milliseconds
            baseProjectileDamage: 12,
            ability: new ExpandProjectile(),
        };

        super(id, position, baseStats, CannonBall);
    }
}

export default Juggernaut;
