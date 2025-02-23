import Entity from "../Entity.js";
import Hitbox from "../Hitbox.js";

class Projectile extends Entity {
    constructor(playerId, x, y, rotation, speed = 2) {
        super(x, y, speed, new Hitbox("circle", x, y, 5), rotation);
        this.owner = playerId;
        this.damage = 1;
    }

    move(deltaTime) {
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

    dealDamage(target) {
        target.health -= this.damage;
    }
}

export default Projectile;
