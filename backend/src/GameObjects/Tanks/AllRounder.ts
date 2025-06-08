import { TankStats } from "../../interface/Stats";
import CannonBall from "../Projectiles/CannonBall";
import Vector2D from "../../Utils/Vector2D";
import Tank from "./Tank";
import Fortess from "../../Abilitiese/Fortess";

class AllRounder extends Tank {
    constructor(id: string, position: Vector2D) {
        const baseStats: TankStats = {
            health: 140,
            speed: 3.5,
            turnSpeed: 2.5,
            shootSpeed: 800, // milliseconds
            baseProjectileDamage: 7,
            ability: new Fortess(),
        };

        super(id, position, baseStats, CannonBall);
    }
}

export default AllRounder;
