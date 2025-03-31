import { CollisionType } from "../Utils/Enums";
import Vector2D from "../Utils/Vector2D";
import Projectile from "./Projectile";

class CannonBall extends Projectile {
    constructor(owner: string, position: Vector2D) {
        super(owner, position, CollisionType.circle)
        this.speed = 2
    }

    move() {

    }

    rotate() {}
}

export default CannonBall