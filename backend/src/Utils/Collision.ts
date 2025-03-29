import { CollisionType } from "./Enums";
import Vector2D from "./Vector2D";

class Collision {
    public collisionType: CollisionType;
    public position: Vector2D
    public vertices: Vector2D[]

    constructor(collisionType: CollisionType, position: Vector2D, vertices: Vector2D[]) {
        this.collisionType = collisionType
        this.position = position
        this.vertices = vertices
    }

    // Method to check if this collision overlaps with another
    public collidesWith(other: Collision): boolean {
        const axes = this.getAxes().concat(other.getAxes());

        for (const axis of axes) {
            const proj1 = this.projectOntoAxis(axis);
            const proj2 = other.projectOntoAxis(axis);

            if (!this.isOverlapping(proj1, proj2)) {
                return false; // Found a separating axis
            }
        }

        return true; // No separating axis found
    }

    private getAxes(): Vector2D[] {
        const axes: Vector2D[] = [];
        for (let i = 0; i < this.vertices.length; i++) {
            const nextIndex = (i + 1) % this.vertices.length;
            const edge = this.vertices[nextIndex].subtract(this.vertices[i]);
            axes.push(new Vector2D(-edge.y, edge.x).normalize());
        }
        return axes;
    }

    private projectOntoAxis(axis: Vector2D): [number, number] {
        let min = Infinity, max = -Infinity;
        for (const vertex of this.vertices) {
            const projection = vertex.dot(axis);
            min = Math.min(min, projection);
            max = Math.max(max, projection);
        }
        return [min, max];
    }

    private isOverlapping(proj1: [number, number], proj2: [number, number]): boolean {
        return !(proj1[1] < proj2[0] || proj2[1] < proj1[0]);
    }
}

export default Collision