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

        if (
            this.x - this.hitbox.radius < 0 ||
            this.x + this.hitbox.radius > 1280 ||
            this.y - this.hitbox.radius < 0 ||
            this.y + this.hitbox.radius > 720
        ) {
            this.speed = -this.speed;
        }
    }

    dealDamage(target) {
        target.health -= this.damage;
    }
}

export default Projectile;
