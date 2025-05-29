import CannonBall from "../Projectiles/CannonBall";
import Vector2D from "../../Utils/Vector2D";
import Tank from "./Tank";
import { TankStats } from "../../interface/Stats";

class Sniper extends Tank {
    constructor(id: string, position: Vector2D) {
        const baseStats: TankStats = {
            health: 20,
            speed: 4,
            turnSpeed: 3,
            shootSpeed: 1000, // milliseconds
        };

        super(id, position, baseStats, CannonBall);
    }
}

export default Sniper;
