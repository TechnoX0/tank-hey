// Tank.js
import Entity from "./Entity";
import { Hitbox, HitboxTypes } from "./Hitbox";

class Tank extends Entity {
    public health;

    constructor(x: number, y: number, speed: number, rotation = 0) {
        super(
            x,
            y,
            speed,
            new Hitbox(HitboxTypes.polygon, x, y, 0, [
                { x: -15, y: -10 },
                { x: 15, y: -10 },
                { x: 15, y: 10 },
                { x: -15, y: 10 },
                { x: -15, y: -10 },
            ]),
            rotation
        );
        this.health = 100;
        this.originalVertices = this.hitbox.vertices;
    }

    move(forward: boolean): void {
        const rad = (this.rotation * Math.PI) / 180; // Convert degrees to radians
        const direction = forward ? 1 : -1; // Move forward or backward

        this.x += Math.cos(rad) * this.speed * direction;
        this.y += Math.sin(rad) * this.speed * direction;

        // Update hitbox position
        this.hitbox.x = this.x;
        this.hitbox.y = this.y;
    }
}

export default Tank;
