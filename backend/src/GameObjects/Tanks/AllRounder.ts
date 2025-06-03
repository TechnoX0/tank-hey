import { TankStats } from "../../interface/Stats";
import CannonBall from "../Projectiles/CannonBall";
import Vector2D from "../../Utils/Vector2D";
import Tank from "./Tank";
import Fortess from "../../Abilitiese/Fortess";

class AllRounder extends Tank {
    constructor(id: string, position: Vector2D) {
        const baseStats: TankStats = {
            health: 30,
            speed: 3,
            turnSpeed: 3,
            shootSpeed: 100, // milliseconds
            baseProjectileDamage: 5,
            ability: new Fortess(),
        };

        super(id, position, baseStats, CannonBall);
    }
}

export default AllRounder;
