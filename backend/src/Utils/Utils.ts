import Vector2D from "../Utils/Vector2D";
import { WallEdge } from "../Maps/Wall";

export function circleIntersectsEdge(
    circleCenter: Vector2D,
    circleRadius: number,
    edge: WallEdge
): boolean {
    const ac = circleCenter.subtract(edge.start);
    const ab = edge.end.subtract(edge.start);

    const abLengthSquared = ab.magnitudeSquared();
    const projection = Math.max(0, Math.min(1, ac.dot(ab) / abLengthSquared));
    const closestPoint = edge.start.add(ab.multiply(projection));

    return circleCenter.distanceTo(closestPoint) <= circleRadius;
}

export function circleSweepEdge(
    circleCenter: Vector2D,
    movement: Vector2D,
    radius: number,
    edge: WallEdge
): { hit: boolean; t: number } {
    const ab = edge.end.subtract(edge.start);
    const abLengthSquared = ab.magnitudeSquared();

    if (abLengthSquared === 0) {
        return { hit: false, t: 0 }; // degenerate edge
    }

    const edgeDir = ab.normalized;
    const normal = edgeDir.perpendicular();

    const relativeVelocity = movement;
    const centerToEdge = edge.start.subtract(circleCenter);

    const dist = centerToEdge.dot(normal);

    const projSpeed = relativeVelocity.dot(normal);

    if (Math.abs(projSpeed) < 1e-8) {
        return { hit: false, t: 0 }; // moving parallel
    }

    const t = (dist - radius) / projSpeed;

    if (t >= 0 && t <= 1) {
        // Check if point of impact is actually within edge bounds
        const impactPoint = circleCenter.add(movement.multiply(t));
        const ac = impactPoint.subtract(edge.start);
        const proj = ac.dot(ab) / abLengthSquared;

        if (proj >= 0 && proj <= 1) {
            return { hit: true, t: t };
        }
    }

    return { hit: false, t: 0 };
}

export function generateCustomUUID(length: number = 16): string {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-=?";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    return result;
}
