import { CollisionType, EntityType } from "../../Utils/Enums";
import Vector2D from "../../Utils/Vector2D";
import Projectile from "./Projectile";
import Wall from "../../Maps/Wall";
import UniformGridManager from "../../UniformGridManager";
import { detectWallCollision, reflectVector } from "../../Utils/PhysicsUtils";
import Tank from "../Tanks/Tank";
import { ProjectileStats } from "../../interface/Stats";

class Shell extends Projectile {
    timeToLive: number = 5;
    timeAlive: number = 0;

    constructor(owner: string, position: Vector2D, stats?: ProjectileStats) {
        const baseStats: ProjectileStats = {
            damage: 3,
            speed: 15,
            maxTimeToLive: 5,
        };

        super(owner, position, CollisionType.circle, stats || baseStats, 5);
    }

    update(deltaTime: number, grid: UniformGridManager) {
        const nearbyWalls = grid.getNearbyWalls(this);
        const nearbyTanks = grid.getNearbyEntities(this, EntityType.tank);

        this.move(nearbyWalls);
        this.checkTankCollision(nearbyTanks);
    }

    move(walls: Wall[]) {
        if (this.isDead) return;

        let movementVector = new Vector2D(
            Math.cos(this.rotation * (Math.PI / 180)),
            Math.sin(this.rotation * (Math.PI / 180))
        ).normalized.multiply(this.speed);

        const steps = 40;
        let subMovement = movementVector.divide(steps);

        for (let i = 0; i < steps; i++) {
            let testPosition = this.position.add(subMovement);
            const hitEdge = detectWallCollision(
                testPosition,
                this.hitbox.radius,
                walls
            );

            if (hitEdge) {
                const edgeNormal = hitEdge.end
                    .subtract(hitEdge.start)
                    .normalized.perpendicular().normalized;

                movementVector = edgeNormal.multiply(this.speed);
                subMovement = movementVector.divide(steps);
                this.position = this.position.add(edgeNormal.multiply(0.5));
                this.isDead = true;
                return;
            }

            this.hitbox.position = testPosition;
            this.position = testPosition;
        }
    }

    checkTankCollision(tanks: Tank[]) {
        for (const tank of tanks) {
            const doesCollide = this.hitbox.collidesWith(tank.hitbox);

            if (doesCollide) {
                if (this.owner == tank.id && this.timeAlive * 1000 < 100)
                    return;
                this.dealDamage(tank);
                return;
            }
        }
    }
}

export default Shell;
