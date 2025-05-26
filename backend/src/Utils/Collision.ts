import Wall from "../Maps/Wall";
import { CollisionType } from "./Enums";
import Vector2D from "./Vector2D";

class Collision {
    public collisionType: CollisionType;
    public position: Vector2D;
    public vertices: Vector2D[] = [new Vector2D(0, 0)];
    public radius: number = 0;

    constructor(collisionType: CollisionType, position: Vector2D, vertices: Vector2D[]);
    constructor(collisionType: CollisionType, position: Vector2D, radius: number);
    constructor(collisionType: CollisionType, position: Vector2D, verticesOrRadius: Vector2D[] | number) {
        this.collisionType = collisionType;
        this.position = position;

        if (Array.isArray(verticesOrRadius)) {
            this.vertices = verticesOrRadius;
        } else if (typeof verticesOrRadius === "number") {
            this.radius = verticesOrRadius;
        } else {
            throw new Error("Invalid verticesOrRadius type. Expected Vector2D[] or number.");
        }
    }


    public collidesWith(other: Collision): boolean {
        if (this.collisionType === CollisionType.circle && other.collisionType === CollisionType.circle) {
            return this.collideCircleWithCircle(other);
        } else if (this.collisionType === CollisionType.circle && other.collisionType === CollisionType.polygon) {
            return this.collideCircleWithPolygon(other);
        } else if (this.collisionType === CollisionType.polygon && other.collisionType === CollisionType.circle) {
            return other.collideCircleWithPolygon(this); // Reverse order
        } else if (this.collisionType === CollisionType.polygon && other.collisionType === CollisionType.polygon) {
            return this.collidePolygonWithPolygon(other);
        }
        return false;
    }

    public collideCircleWithPolygon(other: Collision): boolean {
        const worldVertices = other.vertices.map(v => v.add(other.position));

        if (this.pointInPolygon(this.position, worldVertices)) {
            return true;
        }

        for (let i = 0; i < worldVertices.length; i++) {
            const v1 = worldVertices[i];
            const v2 = worldVertices[(i + 1) % worldVertices.length];

            const closestPointSegment = this.closestPointOnSegment(this.position, v1, v2);
            if (closestPointSegment.distanceTo(this.position) < this.radius) {
                return true;
            }
        }

        return false;
    }

    public collidePolygonWithPolygon(other: Collision): boolean {
        const axes = this.getAxes().concat(other.getAxes());

        for (const axis of axes) {
            const proj1 = this.projectOntoAxis(axis);
            const proj2 = other.projectOntoAxis(axis);

            if (!this.isOverlapping(proj1, proj2)) {
                return false;
            }
        }

        return true;
    }

    public collideCircleWithCircle(other: Collision): boolean {
        const distance = this.position.distanceTo(other.position);
        return distance < this.radius + other.radius;
    }

    private closestPointOnSegment(
        point: Vector2D,
        segmentStart: Vector2D,
        segmentEnd: Vector2D
    ): Vector2D {
        const segment = segmentEnd.subtract(segmentStart);
        const segmentLengthSq = segment.magnitudeSquared();
        
        if (segmentLengthSq === 0) {
            // Degenerate segment: just return the start point
            return segmentStart;
        }
        
        const t = Math.max(0, Math.min(1, point.subtract(segmentStart).dot(segment) / segmentLengthSq));
        return segmentStart.add(segment.multiply(t));
    }

    private pointInPolygon(point: Vector2D, vertices: Vector2D[]): boolean {
        let inside = false;
        for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            const xi = vertices[i].x, yi = vertices[i].y;
            const xj = vertices[j].x, yj = vertices[j].y;

            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi + 0.00001) + xi);

            // console.log(`Checking edge (${xi}, ${yi}) -> (${xj}, ${yj})`);
            // console.log("intersect =", intersect);
            
            if (intersect) inside = !inside;
        }
        return inside;
    }

    private getAxes(): Vector2D[] {
        const axes: Vector2D[] = [];
        for (let i = 0; i < this.vertices?.length; i++) {
            const nextIndex = (i + 1) % this.vertices.length;
            const edge = this.vertices[nextIndex].subtract(this.vertices[i]);
            axes.push(new Vector2D(-edge.y, edge.x).normalized);
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

    getDistanceTo(wall: Collision, movementVector: Vector2D): number | null {
        let minDistance: number | null = null;
        for (const vertex of this.vertices) {
            const projectedVertex = vertex.add(movementVector);
            for (const wallVertex of wall.vertices) {
                const distance = projectedVertex.distanceTo(wallVertex);
                if (minDistance === null || distance < minDistance) {
                    minDistance = distance;
                }
            }
        }
        return minDistance;
    }  

    getClosestPoint(point: Vector2D): Vector2D {
        let closestPoint: Vector2D | null = null;
        let minDistance = Infinity;
    
        for (const vertex of this.vertices) {
            let distance = vertex.subtract(point).magnitude;
            if (distance < minDistance) {
                minDistance = distance;
                closestPoint = vertex;
            }
        }
    
        return closestPoint!;
    }
}

export default Collision;
