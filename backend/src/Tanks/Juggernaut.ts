import Stats from "../interface/Stats";
import CannonBall from "../Projectiles/CannonBall";
import Vector2D from "../Utils/Vector2D";
import Tank from "./Tank";

class Juggernaut extends Tank {
    constructor(id: string, position: Vector2D) {
        const baseStats: Stats = {
            health: 40,
            speed: 2,
            turnSpeed: 1.5,
            shootSpeed: 2000, // milliseconds
        }

        super(id, position, baseStats, CannonBall);
    }
}

export default Juggernaut;