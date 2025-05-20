import MapData from "../interface/MapData";
import Collision from "../Utils/Collision";
import { CollisionType } from "../Utils/Enums";
import Vector2D from "../Utils/Vector2D";
import Projectile from "./Projectile";
import { WallEdge } from "../Maps/Wall";
import { circleIntersectsEdge } from "../Utils/Utils";

class CannonBall extends Projectile {
    timeToLive: number = 5;
    timeAlive: number = 0;
    isDead: boolean = false;

    constructor(owner: string, position: Vector2D) {
        super(owner, position, CollisionType.circle, 5)
        this.speed = 5
    }

    update(deltaTime: number, map: MapData) {
        const timeElapsed = deltaTime / 60
        this.timeAlive += timeElapsed;

        if (this.timeAlive > this.timeToLive) {
            this.isDead = true;
            return;
        }

        this.move(map)
    }

    move(map: MapData) {    
        if (this.isDead) return;

        let movementVector = new Vector2D(
            Math.cos(this.rotation * (Math.PI / 180)),
            Math.sin(this.rotation * (Math.PI / 180))
        ).normalized.multiply(this.speed);
    
        const steps = 20;
        let subMovement = movementVector.divide(steps);
    
        for (let i = 0; i < steps; i++) {
            let testPosition = this.position.add(subMovement);
    
            let hitEdge: WallEdge | null = null;
            for (const wall of map.walls) {
                for (const edge of wall.edges) {
                    if (circleIntersectsEdge(testPosition, this.hitbox.radius, edge)) {
                        hitEdge = edge;
                        break;
                    }
                }
                if (hitEdge) break;
            }
    
            if (hitEdge) {
                const edgeDir = hitEdge.end.subtract(hitEdge.start).normalized;
                const edgeNormal = edgeDir.perpendicular().normalized;
                const reflectedVector = this.onCollisionWithWall(subMovement.normalized, edgeNormal);
    
                movementVector = reflectedVector.multiply(this.speed);
                subMovement = movementVector.divide(steps);
    
                this.position = this.position.add(edgeNormal.multiply(0.5));
                this.rotation = Math.atan2(reflectedVector.y, reflectedVector.x) * (180 / Math.PI);
    
                return;
            }
    
            this.position = testPosition;
        }
    }    
    

    rotate() {}

    onCollisionWithWall(movementVector: Vector2D, wallNormal: Vector2D): Vector2D {
        const dotProduct = movementVector.dot(wallNormal);
        const reflected = movementVector.subtract(wallNormal.multiply(2 * dotProduct));
        return reflected.normalized;
    }
}

export default CannonBall