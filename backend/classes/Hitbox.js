class Hitbox {
    constructor(type, x, y, radius = 0, vertices = []) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vertices = vertices; // Used for polygons and lines
    }

    collidesWith(other) {
        if (this.type === "circle" && other.type === "circle") {
            return this.circleCollision(other);
        } else if (this.type === "polygon" || other.type === "polygon") {
            return this.polygonCollision(other);
        } else if (
            (this.type === "circle" && other.type === "polygon") ||
            (this.type === "polygon" && other.type === "circle")
        ) {
            return this.circlePolygonCollision(other);
        }
        return false;
    }

    circleCollision(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + other.radius;
    }

    polygonCollision(other) {
        const polygons = [this.vertices, other.vertices];
        for (const polygon of polygons) {
            for (let j = 0; j < polygon.length; j++) {
                const k = (j + 1) % polygon.length;
                const normal = {
                    x: polygon[k].y - polygon[j].y,
                    y: polygon[j].x - polygon[k].x,
                };

                let minA = null,
                    maxA = null,
                    minB = null,
                    maxB = null;
                for (const vertex of this.vertices) {
                    const projected = normal.x * vertex.x + normal.y * vertex.y;
                    minA =
                        minA === null ? projected : Math.min(minA, projected);
                    maxA =
                        maxA === null ? projected : Math.max(maxA, projected);
                }
                for (const vertex of other.vertices) {
                    const projected = normal.x * vertex.x + normal.y * vertex.y;
                    minB =
                        minB === null ? projected : Math.min(minB, projected);
                    maxB =
                        maxB === null ? projected : Math.max(maxB, projected);
                }
                if (maxA < minB || maxB < minA) return false;
            }
        }
        return true;
    }

    circlePolygonCollision(polygon) {
        let closestDist = Infinity;
        for (let i = 0; i < polygon.vertices.length; i++) {
            const p1 = polygon.vertices[i];
            const p2 = polygon.vertices[(i + 1) % polygon.vertices.length];
            const closestPoint = this.closestPointOnLine(p1, p2);
            const distX = this.x - closestPoint.x;
            const distY = this.y - closestPoint.y;
            const distance = Math.sqrt(distX * distX + distY * distY);
            closestDist = Math.min(closestDist, distance);
        }
        return closestDist < this.radius;
    }

    closestPointOnLine(p1, p2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const lengthSquared = dx * dx + dy * dy;
        const t = Math.max(
            0,
            Math.min(
                1,
                ((this.x - p1.x) * dx + (this.y - p1.y) * dy) / lengthSquared
            )
        );
        return { x: p1.x + t * dx, y: p1.y + t * dy };
    }
}

export default Hitbox;
