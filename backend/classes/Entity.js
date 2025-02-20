// Entity.js
class Entity {
    constructor(x, y, speed, hitbox, rotation = 0) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.rotation = rotation;
        this.hitbox = hitbox;
        this.color = "orange";
    }

    move(forward) {
        const rad = (this.rotation * Math.PI) / 180; // Convert degrees to radians
        const direction = forward ? 1 : -1; // Move forward or backward

        this.x += Math.cos(rad) * this.speed * direction;
        this.y += Math.sin(rad) * this.speed * direction;

        // Update hitbox position
        this.hitbox.x = this.x;
        this.hitbox.y = this.y;
    }

    rotate(angle) {
        this.rotation = (this.rotation + angle) % 360;
        const rad = (this.rotation * Math.PI) / 180;

        this.hitbox.vertices = this.originalVertices.map(({ x, y }) => {
            const rotatedX = x * Math.cos(rad) - y * Math.sin(rad);
            const rotatedY = x * Math.sin(rad) + y * Math.cos(rad);

            return { x: rotatedX, y: rotatedY };
        });
    }
}

export default Entity;
