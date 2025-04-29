import Collision from "../Utils/Collision";
import { CollisionType } from "../Utils/Enums";
import Vector2D from "../Utils/Vector2D";

interface WallEdge {
    start: Vector2D;
    end: Vector2D;
}

class Wall {
    corners: Vector2D[];
    collision: Collision;
    edges: WallEdge[];

    constructor(start: Vector2D, end: Vector2D, thickness: number) {
        this.corners = this.calculateCorners(start, end, thickness);
        this.collision = new Collision(CollisionType.polygon, this.corners[0], this.corners)
        this.edges = this.calculateEdges();
    }

    private calculateCorners(start: Vector2D, end: Vector2D, thickness: number): Vector2D[] {
        const direction = end.subtract(start).normalized;
        const perp = direction.perpendicular().multiply(thickness / 2);

        return [
            start.subtract(perp),
            start.add(perp),
            end.add(perp),
            end.subtract(perp),
            start.subtract(perp) // Closing the shape
        ];
    }

    private calculateEdges(): WallEdge[] {
        const edges: WallEdge[] = [];
        for (let i = 0; i < this.corners.length - 1; i++) {
            edges.push({
                start: this.corners[i],
                end: this.corners[i + 1]
            });
        }
        return edges;
    }

    get getNormal(): Vector2D {
        const start = this.corners[0];
        const end = this.corners[1];

        const direction = end.subtract(start).normalized;
        const normal = direction.perpendicular().normalized;

        return normal;
    }
}

export default Wall