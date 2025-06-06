import { TankStats } from "../../interface/Stats";
import CannonBall from "../Projectiles/CannonBall";
import Vector2D from "../../Utils/Vector2D";
import Tank from "./Tank";
import ExpandProjectile from "../../Abilitiese/FullImpact";

class Juggernaut extends Tank {
    constructor(id: string, position: Vector2D) {
        const baseStats: TankStats = {
            health: 40,
            speed: 1,
            turnSpeed: 1,
            shootSpeed: 2000, // milliseconds
            baseProjectileDamage: 10,
            ability: new ExpandProjectile(),
        };

        super(id, position, baseStats, CannonBall);
    }
}

export default Juggernaut;
