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

    move(canvasWidth: number, canvasHeight: number, forward: number) {
        const rad = (this.rotation * Math.PI) / 180;
        const direction = forward ? 1 : -1;
        let newX = this.x + Math.cos(rad) * this.speed * direction;
        let newY = this.y + Math.sin(rad) * this.speed * direction;

        const newVertices = this.hitbox.vertices.map(vertex => {
            const vx = vertex.x + Math.cos(rad) * this.speed * direction;
            const vy = vertex.y + Math.sin(rad) * this.speed * direction;

            return { x: vx, y: vy };
        })

        const outOfBoundsX = newVertices.some(vertex => this.x + vertex.x < 0 || this.x + vertex.x > canvasWidth);
        const outOfBoundsY = newVertices.some(vertex => this.y + vertex.y < 0 || this.y + vertex.y > canvasHeight);

        if (outOfBoundsX && outOfBoundsY) {
            return;
        } else if (outOfBoundsX) {
            newX = this.x;
        } else if (outOfBoundsY) {
            newY = this.y;
        }
        
        this.x = newX
        this.y = newY
    }
}

export default Tank;
