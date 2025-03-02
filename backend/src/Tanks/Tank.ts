import GameObject from "../Utils/GameObject";
import Movement from "../interface/Movement";
import Vector2D from "../Utils/Vector2D";
import { Hitbox, HitboxTypes } from "../Utils/Hitbox";
import MapData from "../interface/MapData";
import lineIntersection from "../Utils/LineIntersect";
import Line from "../interface/Line";

class Tank extends GameObject implements Movement {
    public speed: number = 5;
    public rotation: number = 0;
    public health: number;
    public turnSpeed: number = 2
    public intersection: Vector2D[];
    public lines: Line[];

    constructor(position: Vector2D) {
        super(
            position,
            new Hitbox(HitboxTypes.polygon, new Vector2D(position.x, position.y), 0, [
                new Vector2D(-15, -10),
                new Vector2D(15, -10),
                new Vector2D(15, 10),
                new Vector2D(-15, 10),
                new Vector2D(-15, -10),
            ]),
        );
        this.health = 100;
        this.originalVertices = this.hitbox.vertices;
        this.intersection = []
        this.lines = []
    }

    private getCollisionData(movementVector: Vector2D, map: MapData) {
        let collisionData = []

        const newVertices = this.hitbox.vertices.map(vertex => 
            vertex.add(movementVector)
        )

        for (let i = 0; i < newVertices.length; i++) {
            const currVetex = this.hitbox.vertices[i]
            const newVertex = newVertices[i];
            const lineOne = {start: currVetex.add(this.position), end: newVertex.add(this.position)}

            for (const wall of map.walls) {
                const intersection = lineIntersection(lineOne, wall)

                if (intersection) {
                    const distance = currVetex.add(this.position).distanceTo(intersection)
                    collisionData.push({distance, intersection})
                }
            }
        }

        collisionData.sort((a, b) => a.distance - b.distance)

        return collisionData
    }

    move(map: MapData, forward: number) {
        const direction = forward ? 1 : -1

        let movementVector = new Vector2D(
            Math.cos(this.rotation * (Math.PI / 180)) * (this.speed * direction),
            Math.sin(this.rotation * (Math.PI / 180)) * (this.speed * direction)
        );
    
        // If no movement, skip collision checks
        if (movementVector.vectorLength() < 0.01) {
            return;
        }
    
        const collisionData = this.getCollisionData(movementVector, map);
    
        if (collisionData.length) {
            // Get all collisions that will happen at nearly the same time
            // (within a small distance threshold of the earliest collision)
            const firstCollision = collisionData[0];
            const threshold = 0.5; // Adjust based on your game's scale
            const nearbyCollisions = collisionData.filter(col => 
                col.distance - firstCollision.distance < threshold
            );
            
            // If we have multiple collision points, we need to handle them differently
            if (nearbyCollisions.length > 1) {
                // For multiple collisions, it's safer to just apply the simple fallback
                const safeDistance = Math.max(0, firstCollision.distance - 0.5);
                const safeRatio = safeDistance / movementVector.vectorLength();
                movementVector = movementVector.multiply(safeRatio);
            } 
            else {
                // For a single collision, we can implement sliding
                const collision = firstCollision;
                
                // Find the wall that was hit
                let hitWall = null;
                let smallestDistance = Infinity;
                
                for (const wall of map.walls) {
                    // Find the closest wall to the intersection point
                    const distToWall = this.pointToLineDistance(collision.intersection, wall);
                    if (distToWall < smallestDistance) {
                        smallestDistance = distToWall;
                        hitWall = wall;
                    }
                }
                
                if (hitWall) {
                    // Wall direction vector
                    const wallVector = new Vector2D(
                        hitWall.end.x - hitWall.start.x,
                        hitWall.end.y - hitWall.start.y
                    ).normalize();
                    
                    // Project movement onto wall direction to get sliding component
                    const dotProduct = movementVector.x * wallVector.x + movementVector.y * wallVector.y;
                    const slideVector = new Vector2D(
                        wallVector.x * dotProduct,
                        wallVector.y * dotProduct
                    );
                    
                    // Apply a slight scaling to prevent sticking to the wall
                    const slideFactor = 0.8; // Adjust as needed (0.9 = 90% of full slide)
                    
                    // Apply safe distance for approach component and sliding for parallel component
                    const safeDistance = Math.max(0, collision.distance - 0.01);
                    const safeRatio = safeDistance / movementVector.vectorLength();
                    const approachVector = movementVector.multiply(safeRatio);
                    
                    // Combine approach and slide vectors
                    movementVector = slideVector.multiply(slideFactor);
                    
                    // Check if the slide vector would cause a new collision
                    const slideCollisions = this.getCollisionData(movementVector, map);
                    
                    if (slideCollisions.length > 0) {
                        // If sliding would cause a new collision, use the approach vector only
                        movementVector = approachVector;
                    }
                }
            }
        }
    
        this.position = this.position.add(movementVector);
    }
    
    // Helper method to calculate distance from a point to a line segment
    private pointToLineDistance(point: Vector2D, line: Line): number {
        const { start, end } = line;
        
        // Vector from line start to point
        const v1 = new Vector2D(point.x - start.x, point.y - start.y);
        // Vector from line start to line end
        const v2 = new Vector2D(end.x - start.x, end.y - start.y);
        
        // Length of the line segment squared
        const lenSquared = v2.x * v2.x + v2.y * v2.y;
        
        // If line is a point, just return distance to that point
        if (lenSquared === 0) {
            return Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        }
        
        // Project v1 onto v2
        const t = Math.max(0, Math.min(1, (v1.x * v2.x + v1.y * v2.y) / lenSquared));
        
        // Closest point on line
        const projection = new Vector2D(
            start.x + t * v2.x,
            start.y + t * v2.y
        );
        
        // Return distance to closest point
        return Math.sqrt(
            Math.pow(point.x - projection.x, 2) + 
            Math.pow(point.y - projection.y, 2)
        );
    }
    

    private checkRotationCollision(rotatedVertices: Vector2D[], map: MapData): boolean {
        // Create polygon edges from the rotated vertices
        for (let i = 0; i < rotatedVertices.length - 1; i++) {
            const line = {
                start: rotatedVertices[i].add(this.position),
                end: rotatedVertices[i + 1].add(this.position)
            };
            
            // Check each wall for intersection
            for (const wall of map.walls) {
                if (lineIntersection(line, wall)) {
                    return true;
                }
            }
        }
        
        // Don't forget to check the last edge (connecting last vertex to first)
        const lastLine = {
            start: rotatedVertices[rotatedVertices.length - 1].add(this.position),
            end: rotatedVertices[0].add(this.position)
        };
        
        for (const wall of map.walls) {
            if (lineIntersection(lastLine, wall)) {
                return true;
            }
        }
        
        return false;
    }

    rotate(angle: number, map: MapData) {
        // Calculate the potential new rotation
        const newRotation = (this.rotation + angle) % 360;
        const newRad = (newRotation * Math.PI) / 180;
        
        // Calculate where vertices would be after rotation
        const potentialVertices = this.originalVertices.map(({ x, y }) => {
            const rotatedX = x * Math.cos(newRad) - y * Math.sin(newRad);
            const rotatedY = x * Math.sin(newRad) + y * Math.cos(newRad);
            
            return new Vector2D(rotatedX, rotatedY);
        });
        
        // Check for collisions with the new rotated vertices
        const wouldCollide = this.checkRotationCollision(potentialVertices, map);
        
        // Only apply rotation if no collision would occur
        if (!wouldCollide) {
            this.rotation = newRotation;
            this.hitbox.vertices = potentialVertices;
        }
    }
}

export default Tank;
