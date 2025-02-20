// Projectile.js
import Entity from "./Entity.js";

class Projectile extends Entity {
    constructor(x, y, speed, rotation, type = "bullet") {
        super(x, y, speed, rotation);
        this.type = type;
        this.bounces = type === "laser" ? 3 : 0;
    }

    update() {
        const radians = (this.rotation * Math.PI) / 180;
        this.move(Math.cos(radians), Math.sin(radians));
    }

    checkCollision(walls) {
        for (let wall of walls) {
            if (this.collidesWith(wall)) {
                if (this.bounces > 0) {
                    this.bounces--;
                    this.rotation = (this.rotation + 180) % 360; // Reflect
                } else {
                    return true; // Destroy projectile
                }
            }
        }
        return false;
    }
}

export default Projectile;
