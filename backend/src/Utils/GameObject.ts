import { Hitbox } from "./Hitbox";
import Vector2D from "./Vector2D";

abstract class GameObject {
    public position: Vector2D;
    public hitbox: Hitbox;
    public originalVertices: Vector2D[];

    constructor(position: Vector2D, hitbox: Hitbox) {
        this.position = position;
        this.hitbox = hitbox;
        this.originalVertices = hitbox.vertices;
    }

    getSupportPoint(direction: Vector2D): Vector2D {
        let bestVertex = this.hitbox.vertices[0];
        let bestDot = bestVertex.dot(direction);

        for (const vertex of this.hitbox.vertices) {
            const dot = vertex.dot(direction);
            if (dot > bestDot) {
                bestDot = dot;
                bestVertex = vertex;
            }
        }
        return bestVertex.add(this.position);
    }
}

export default GameObject;
