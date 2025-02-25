import GameObject from "./GameObject";
import Movement from "./interface/Movement";
import Vector2D from "./Vector2D";
import { Hitbox, HitboxTypes } from "./Hitbox";

class Tank extends GameObject implements Movement {
    public speed: number = 5;
    public rotation: number = 0;
    public health: number;
    public turnSpeed: number = 2

    constructor(position: Vector2D) {
        super(
            position,
            new Hitbox(HitboxTypes.polygon, new Vector2D(position.x, position.y), 0, [
                new Vector2D(-15, -10),
                new Vector2D(15, -10),
                new Vector2D(15, 10),
                new Vector2D(-15, 10),
                new Vector2D(-15, -10),
            ]),
        );
        this.health = 100;
        this.originalVertices = this.hitbox.vertices;
    }

    move(canvasWidth: number, canvasHeight: number, forward: number) {
        const rad = (this.rotation * Math.PI) / 180;
        const direction = forward ? 1 : -1;
        
        // Create movement vector using direction and speed
        const movementVector = new Vector2D(
            Math.cos(rad) * this.speed * direction,
            Math.sin(rad) * this.speed * direction
        );
        
        // Calculate new position using vector addition
        const newPosition = this.position.add(movementVector);

        // Calculate new vertices using vector addition
        const newVertices = this.hitbox.vertices.map(vertex => 
            vertex.add(movementVector)
        );

        // Check boundaries
        const outOfBoundsX = newVertices.some(vertex => 
            this.position.x + vertex.x < 0 || this.position.x + vertex.x > canvasWidth
        );
        
        const outOfBoundsY = newVertices.some(vertex => 
            this.position.y + vertex.y < 0 || this.position.y + vertex.y > canvasHeight
        );

        // Apply movement with boundary constraints
        if (outOfBoundsX && outOfBoundsY) {
            return;
        } else if (outOfBoundsX) {
            this.position.y = newPosition.y;
        } else if (outOfBoundsY) {
            this.position.x = newPosition.x;
        } else {
            this.position = newPosition;
        }
    }

    rotate(angle: number) {
        this.rotation = (this.rotation + angle) % 360;
        const rad = (this.rotation * Math.PI) / 180;

        this.hitbox.vertices = this.originalVertices.map(({ x, y }) => {
            const rotatedX = x * Math.cos(rad) - y * Math.sin(rad);
            const rotatedY = x * Math.sin(rad) + y * Math.cos(rad);

            return new Vector2D(rotatedX, rotatedY);
        });
    }
}

export default Tank;
