import { Hitbox, HitboxTypes } from "../Utils/Hitbox";
import Vector2D from "../Utils/Vector2D";
import Projectile from "./Projectile";

class CannonBall extends Projectile {
    constructor(owner: string, position: Vector2D) {
        super(owner, position, HitboxTypes.circle)
        this.speed = 2
    }

    move() {

    }

    rotate() {}
}