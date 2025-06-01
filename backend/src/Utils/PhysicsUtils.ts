import Wall, { WallEdge } from "../Maps/Wall";
import { circleIntersectsEdge } from "./Utils";
import Vector2D from "./Vector2D";

export function reflectVector(incoming: Vector2D, normal: Vector2D): Vector2D {
    const dot = incoming.dot(normal);
    return incoming.subtract(normal.multiply(2 * dot));
}

export function detectWallCollision(position: Vector2D, radius: number, walls: Wall[]): WallEdge | null {
    for (const wall of walls) {
        for (const edge of wall.edges) {
            if (circleIntersectsEdge(position, radius, edge)) {
                return edge;
            }
        }
    }
    return null;
}
