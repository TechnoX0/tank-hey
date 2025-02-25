import { Hitbox, HitboxTypes } from "../Hitbox";
import Vector2D from "../Vector2D";
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