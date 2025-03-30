import Collision from "../Utils/Collision";
import { CollisionType } from "../Utils/Enums";
import Vector2D from "../Utils/Vector2D";

class Wall {
    corners: Vector2D[];
    collision: Collision;

    constructor(start: Vector2D, end: Vector2D, thickness: number) {
        this.corners = this.calculateCorners(start, end, thickness);
        this.collision = new Collision(CollisionType.polygon, this.corners[0], this.corners)
    }

    private calculateCorners(start: Vector2D, end: Vector2D, thickness: number): Vector2D[] {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        // Normalize direction
        const nx = dx / length;
        const ny = dy / length;
        
        // Perpendicular vector
        const perpX = -ny * (thickness / 2);
        const perpY = nx * (thickness / 2);
        
        return [
            new Vector2D(start.x - perpX, start.y - perpY),
            new Vector2D(start.x + perpX, start.y + perpY),
            new Vector2D(end.x + perpX, end.y + perpY),
            new Vector2D(end.x - perpX, end.y - perpY),
            new Vector2D(start.x - perpX, start.y - perpY) // Closing the shape
        ];
    }
}

export default Wall