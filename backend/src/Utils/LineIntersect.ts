import Vector2D from "../Utils/Vector2D";
import Line from "../interface/Line";

function lineIntersection(line1: Line, line2: Line): Vector2D | null {
    const { start: p1, end: p2 } = line1;
    const { start: p3, end: p4 } = line2;

    const d1 = p2.subtract(p1); // Direction of first segment
    const d2 = p4.subtract(p3); // Direction of second segment
    const denom = d1.x * d2.y - d1.y * d2.x;

    if (denom === 0) {
        return null; // Parallel lines, no intersection
    }

    const diff = p3.subtract(p1);
    const t = (diff.x * d2.y - diff.y * d2.x) / denom;
    const u = (diff.x * d1.y - diff.y * d1.x) / denom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return p1.add(d1.multiply(t)); // Compute intersection point
    }

    return null; // No intersection within the segments
}

export default lineIntersection