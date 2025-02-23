import Entity from "../Entity.js";
import {Hitbox, HitboxTypes} from "../Hitbox.js";
import Tank from "../Tank.js";

abstract class Projectile extends Entity {
    public owner: string;
    public damage: number;

    constructor(owner: string, x: number, y: number, rotation: number, speed: number = 2) {
        super(x, y, speed, new Hitbox(HitboxTypes.circle, x, y, 5), rotation);
        this.owner = owner;
        this.damage = 1;
    }

    move(deltaTime: number) {
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
        } else if (this.x + this.hitbox.radius > 1280) {
            this.rotation = 180 - this.rotation;
            this.x = 1280 - this.hitbox.radius - buffer;
        }

        // Reflect off horizontal walls
        if (this.y - this.hitbox.radius < 0) {
            this.rotation = -this.rotation;
            this.y = this.hitbox.radius + buffer;
        } else if (this.y + this.hitbox.radius > 720) {
            this.rotation = -this.rotation;
            this.y = 720 - this.hitbox.radius - buffer;
        }

        // Ensure rotation stays within 0-360 degrees
        this.rotation = (this.rotation + 360) % 360;
    }

    dealDamage(target: Tank) {
        target.health -= this.damage;
    }
}

export default Projectile;
