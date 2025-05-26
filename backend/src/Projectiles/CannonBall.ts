import { CollisionType, EntityType } from "../Utils/Enums";
import Vector2D from "../Utils/Vector2D";
import Projectile from "./Projectile";
import Wall from "../Maps/Wall";;
import UniformGridManager from "../UniformGridManager";
import GameObject from "../GameObjects/GameObject";
import { detectWallCollision, reflectVector } from "../Utils/PhysicsUtils";

class CannonBall extends Projectile {
    timeToLive: number = 5;
    timeAlive: number = 0;

    constructor(owner: string, position: Vector2D) {
        super(owner, position, CollisionType.circle, 5)
        this.speed = 5
    }

    update(deltaTime: number, grid: UniformGridManager) {
        const timeElapsed = deltaTime / 60
        this.timeAlive += timeElapsed;

        const nearbyWalls = grid.getNearbyWalls(this)
        const nearbyTanks = grid.getNearbyEntities(this, EntityType.tank)

        this.move(nearbyWalls)

        this.checkTankCollision(nearbyTanks);
        // Add proper damager logic here

        if (this.timeAlive > this.timeToLive) {
            this.isDead = true;
            return;
        }

    }

    move(walls: Wall[]) {
        if (this.isDead) return;

        let movementVector = new Vector2D(
            Math.cos(this.rotation * (Math.PI / 180)),
            Math.sin(this.rotation * (Math.PI / 180))
        ).normalized.multiply(this.speed);

        const steps = 20;
        let subMovement = movementVector.divide(steps);

        for (let i = 0; i < steps; i++) {
            let testPosition = this.position.add(subMovement);
            const hitEdge = detectWallCollision(testPosition, this.hitbox.radius, walls);

            if (hitEdge) {
                const edgeNormal = hitEdge.end.subtract(hitEdge.start).normalized.perpendicular().normalized;
                const reflected = reflectVector(subMovement.normalized, edgeNormal);

                movementVector = reflected.multiply(this.speed);
                subMovement = movementVector.divide(steps);
                this.position = this.position.add(edgeNormal.multiply(0.5));
                this.rotation = Math.atan2(reflected.y, reflected.x) * (180 / Math.PI);
                return;
            }

            this.hitbox.position = testPosition;
            this.position = testPosition;
        }
    }  
    
    checkTankCollision(tanks: GameObject[]) {
        for (const tank of tanks) {
            const doesCollide = this.hitbox.collidesWith(tank.hitbox);
            // const doesCollide = this.hitbox.collideWithPolygon(tank.hitbox)
            console.log(doesCollide)
        }
    }

    onCollisionWithWall(movementVector: Vector2D, wallNormal: Vector2D): Vector2D {
        const dotProduct = movementVector.dot(wallNormal);
        const reflected = movementVector.subtract(wallNormal.multiply(2 * dotProduct));
        return reflected.normalized;
    }
}

export default CannonBall