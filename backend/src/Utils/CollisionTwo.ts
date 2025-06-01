import Wall from "../Maps/Wall"; // Assuming Wall might be used elsewhere or in future
import { CollisionType } from "./Enums";
import Vector2D from "./Vector2D";

class Collision {
    public collisionType: CollisionType;
    public position: Vector2D; // World position of the shape's origin
    public vertices: Vector2D[]; // Local vertices for polygons, typically [new Vector2D(0,0)] for circles if not explicitly set otherwise
    public radius: number;

    constructor(collisionType: CollisionType, position: Vector2D, vertices: Vector2D[]);
    constructor(collisionType: CollisionType, position: Vector2D, radius: number);
    constructor(collisionType: CollisionType, position: Vector2D, verticesOrRadius: Vector2D[] | number) {
        this.collisionType = collisionType;
        this.position = position;
        this.vertices = [new Vector2D(0, 0)]; // Default for vertices
        this.radius = 0; // Default for radius

        if (Array.isArray(verticesOrRadius)) {
            this.vertices = verticesOrRadius;
        } else if (typeof verticesOrRadius === "number") {
            this.radius = verticesOrRadius;
        } else {
            throw new Error("Invalid verticesOrRadius type. Expected Vector2D[] or number.");
        }
    }

    /**
     * Checks if this collision object collides with another.
     */
    public collidesWith(other: Collision): boolean {
        if (this.collisionType === CollisionType.circle && other.collisionType === CollisionType.circle) {
            return this._collideCircleWithCircle(other);
        } else if (this.collisionType === CollisionType.circle && other.collisionType === CollisionType.polygon) {
            return this._collideCircleWithPolygon(other);
        } else if (this.collisionType === CollisionType.polygon && other.collisionType === CollisionType.circle) {
            return other._collideCircleWithPolygon(this); // Call on circle, pass polygon
        } else if (this.collisionType === CollisionType.polygon && other.collisionType === CollisionType.polygon) {
            return this._collidePolygonWithPolygon(other);
        }
        console.warn("Unsupported collision type combination for collidesWith:", this.collisionType, other.collisionType);
        return false;
    }

    /**
     * Circle-Circle collision detection.
     */
    private _collideCircleWithCircle(other: Collision): boolean {
        const distanceSq = this.position.subtract(other.position).magnitudeSquared();
        const combinedRadius = this.radius + other.radius;
        return distanceSq < combinedRadius * combinedRadius;
    }

    /**
     * Circle-Polygon collision detection.
     * 'this' is the circle, 'polygonCollision' is the polygon.
     */
    private _collideCircleWithPolygon(polygonCollision: Collision): boolean {
        const circleCenter = this.position; // World space
        const circleRadius = this.radius;

        const polygonWorldVertices = polygonCollision.vertices.map(v => v.add(polygonCollision.position));

        if (polygonWorldVertices.length < 2) return false; // Not a valid polygon for edge checks

        // 1. Check if circle center is inside the polygon
        if (this._isPointInPolygon(circleCenter, polygonWorldVertices)) {
            return true;
        }

        // 2. Check if any polygon edge is close enough to the circle center
        for (let i = 0; i < polygonWorldVertices.length; i++) {
            const v1 = polygonWorldVertices[i];
            const v2 = polygonWorldVertices[(i + 1) % polygonWorldVertices.length];

            const closestPointToCenterOnSegment = this._closestPointOnSegment(circleCenter, v1, v2);
            if (closestPointToCenterOnSegment.subtract(circleCenter).magnitudeSquared() < circleRadius * circleRadius) {
                return true;
            }
        }
        return false;
    }

    /**
     * Polygon-Polygon collision detection using Separating Axis Theorem (SAT).
     * Assumes convex polygons.
     */
    private _collidePolygonWithPolygon(other: Collision): boolean {
        const worldVerticesThis = this.vertices.map(v => v.add(this.position));
        const worldVerticesOther = other.vertices.map(v => v.add(other.position));

        if (worldVerticesThis.length < 3 || worldVerticesOther.length < 3) {
            // SAT typically applies to polygons with at least 3 vertices.
            // For simplicity, returning false, but specific behavior for degenerate cases might be desired.
            return false;
        }

        const axesThis = this._getSATNormalizedAxes(worldVerticesThis);
        const axesOther = this._getSATNormalizedAxes(worldVerticesOther);

        for (const axis of axesThis) {
            const proj1 = this._projectPolygonOntoAxis(worldVerticesThis, axis);
            const proj2 = this._projectPolygonOntoAxis(worldVerticesOther, axis);
            if (!this._doProjectionsOverlap(proj1, proj2)) {
                return false; // Found a separating axis
            }
        }

        for (const axis of axesOther) {
            const proj1 = this._projectPolygonOntoAxis(worldVerticesThis, axis);
            const proj2 = this._projectPolygonOntoAxis(worldVerticesOther, axis);
            if (!this._doProjectionsOverlap(proj1, proj2)) {
                return false; // Found a separating axis
            }
        }

        return true; // No separating axis found
    }

    // --- SAT Helper Methods ---
    private _getSATNormalizedAxes(worldVertices: Vector2D[]): Vector2D[] {
        const axes: Vector2D[] = [];
        if (worldVertices.length < 2) return axes;

        for (let i = 0; i < worldVertices.length; i++) {
            const p1 = worldVertices[i];
            const p2 = worldVertices[(i + 1) % worldVertices.length];
            const edge = p2.subtract(p1);
            const normal = new Vector2D(-edge.y, edge.x); // Perpendicular vector
            axes.push(normal.normalized); // Vector2D.normalized is a getter
        }
        return axes;
    }

    private _projectPolygonOntoAxis(worldVertices: Vector2D[], axis: Vector2D): [number, number] {
        let min = Infinity;
        let max = -Infinity;
        for (const vertex of worldVertices) {
            const projection = vertex.dot(axis);
            min = Math.min(min, projection);
            max = Math.max(max, projection);
        }
        return [min, max];
    }

    private _doProjectionsOverlap(proj1: [number, number], proj2: [number, number]): boolean {
        return proj1[0] <= proj2[1] && proj1[1] >= proj2[0];
    }

    // --- General Geometry Helper Methods ---
    private _closestPointOnSegment(
        point: Vector2D,
        segmentStart: Vector2D,
        segmentEnd: Vector2D
    ): Vector2D {
        const segmentVector = segmentEnd.subtract(segmentStart);
        const segmentLengthSq = segmentVector.magnitudeSquared();

        if (segmentLengthSq === 0) {
            return segmentStart; // Segment is a point
        }

        const t = point.subtract(segmentStart).dot(segmentVector) / segmentLengthSq;

        if (t < 0) {
            return segmentStart;
        } else if (t > 1) {
            return segmentEnd;
        }
        return segmentStart.add(segmentVector.multiply(t));
    }

    private _isPointInPolygon(point: Vector2D, polygonWorldVertices: Vector2D[]): boolean {
        let inside = false;
        if (polygonWorldVertices.length < 3) return false;

        for (let i = 0, j = polygonWorldVertices.length - 1; i < polygonWorldVertices.length; j = i++) {
            const xi = polygonWorldVertices[i].x, yi = polygonWorldVertices[i].y;
            const xj = polygonWorldVertices[j].x, yj = polygonWorldVertices[j].y;

            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi + Number.EPSILON) + xi);

            if (intersect) {
                inside = !inside;
            }
        }
        return inside;
    }

    /**
     * Calculates an approximate distance between this shape (after applying movementVector)
     * and the 'wall' shape.
     * - For Circle-Circle: distance between surfaces.
     * - For Circle-Polygon: distance from circle surface to closest polygon VERTEX.
     * - For Polygon-Polygon: distance between closest VERTICES.
     * Note: This is NOT a true "shortest distance between shapes" for polygon edges.
     * Negative values imply overlap by that amount (approximately).
     */
    public getDistanceTo(wall: Collision, movementVector: Vector2D): number | null {
        let minDistanceSq: number | null = null;

        const getEffectiveWorldPoints = (collisionObj: Collision, moveVec: Vector2D = new Vector2D(0,0)): Vector2D[] => {
            if (collisionObj.collisionType === CollisionType.circle) {
                return [collisionObj.position.add(moveVec)]; // Represent circle by its center
            }
            // For polygons, use actual vertices
            return collisionObj.vertices.map(v => v.add(collisionObj.position).add(moveVec));
        };

        const thisWorldPoints = getEffectiveWorldPoints(this, movementVector);
        const wallWorldPoints = getEffectiveWorldPoints(wall);

        if (thisWorldPoints.length === 0 || wallWorldPoints.length === 0) return null;

        for (const p1 of thisWorldPoints) {
            for (const p2 of wallWorldPoints) {
                const distanceSq = p1.subtract(p2).magnitudeSquared();
                if (minDistanceSq === null || distanceSq < minDistanceSq) {
                    minDistanceSq = distanceSq;
                }
            }
        }

        if (minDistanceSq !== null) {
            let distance = Math.sqrt(minDistanceSq);
            if (this.collisionType === CollisionType.circle && wall.collisionType === CollisionType.circle) {
                distance -= (this.radius + wall.radius);
            } else if (this.collisionType === CollisionType.circle) {
                distance -= this.radius;
            } else if (wall.collisionType === CollisionType.circle) {
                distance -= wall.radius;
            }
            return distance;
        }
        return null;
    }


    /**
     * Gets the closest point on the boundary of this shape to a given world-space point.
     * For polygons, this implementation returns the closest VERTEX in world-space.
     * For circles, it returns the point on its circumference.
     */
    public getClosestPoint(worldPoint: Vector2D): Vector2D {
        if (this.collisionType === CollisionType.circle) {
            // Use your Vector2D's 'equals' method
            if (this.position.equals(worldPoint)) {
                return this.position.add(new Vector2D(this.radius, 0));
            }
            const direction = worldPoint.subtract(this.position);
            return this.position.add(direction.normalized.multiply(this.radius)); // .normalized is a getter
        } else if (this.collisionType === CollisionType.polygon) {
            if (!this.vertices || this.vertices.length === 0) {
                throw new Error("Polygon has no vertices to find the closest point from.");
            }

            let closestWorldVertex: Vector2D = this.vertices[0].add(this.position);
            // Use subtract(vector).magnitudeSquared()
            let minDistanceSq = closestWorldVertex.subtract(worldPoint).magnitudeSquared();

            for (let i = 1; i < this.vertices.length; i++) {
                const worldVertex = this.vertices[i].add(this.position);
                const distanceSq = worldVertex.subtract(worldPoint).magnitudeSquared();
                if (distanceSq < minDistanceSq) {
                    minDistanceSq = distanceSq;
                    closestWorldVertex = worldVertex;
                }
            }
            return closestWorldVertex;
        }
        throw new Error(`getClosestPoint not implemented for collision type ${this.collisionType}`);
    }
}

export default Collision;