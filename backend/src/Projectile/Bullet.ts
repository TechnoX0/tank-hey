import Projectile from "./Projectile";
import { HitboxTypes } from "../Hitbox";

class Bullet extends Projectile {
    constructor(owner: string, x: number, y: number, rotation: number, speed: number = 10) {
        super(owner, x, y, rotation, HitboxTypes.circle, 10);
        this.damage = 10;
    }

    move(canvasWidth: number, canvasHeight: number, deltaTime: number): void {
        const rad = (this.rotation * Math.PI) / 180; // Convert degrees to radians
        this.x += Math.cos(rad) * this.speed * deltaTime;
        this.y += Math.sin(rad) * this.speed * deltaTime;

        // Update hitbox position
        this.hitbox.x = this.x;
        this.hitbox.y = this.y;

        const buffer = 2; // Push projectile back inside the canvas after collision

        // Reflect off vertical walls
        if (this.x - this.hitbox.radius < 0) {
            this.rotation = 180 - this.rotation;
            this.x = this.hitbox.radius + buffer; // Push projectile inside
        } else if (this.x + this.hitbox.radius > canvasWidth) {
            this.rotation = 180 - this.rotation;
            this.x = canvasWidth - this.hitbox.radius - buffer;
        }

        // Reflect off horizontal walls
        if (this.y - this.hitbox.radius < 0) {
            this.rotation = -this.rotation;
            this.y = this.hitbox.radius + buffer;
        } else if (this.y + this.hitbox.radius > canvasHeight) {
            this.rotation = -this.rotation;
            this.y = canvasHeight - this.hitbox.radius - buffer;
        }

        // Ensure rotation stays within 0-360 degrees
        this.rotation = (this.rotation + 360) % 360;
    }
}

export default Bullet