import GameObject from "../GameObject";
import Movement from "../../interface/Movement";
import Vector2D from "../../Utils/Vector2D";
import { MapData } from "../../interface/Map";
import { CollisionType, EntityType } from "../../Utils/Enums";
import Collision from "../../Utils/Collision";
import Projectile from "../Projectiles/Projectile";
import { TankStats } from "../../interface/Stats";
import PowerUp from "../PowerUps/PowerUp";

abstract class Tank extends GameObject implements Movement {
    // Power-ups
    public activePowerUps: PowerUp[] = [];
    public onShootModifiers: ((projectile: Projectile) => void)[] = [];
    public movementModifiers: ((direction: Vector2D) => Vector2D)[] = [];
    public inputBlockers: Set<string> = new Set(); // e.g., "disarm", "invert"

    // Base stats
    protected baseStats: TankStats;

    // Current stats
    public health: number;
    public speed: number;
    public turnSpeed: number;
    public shootSpeed: number; // milliseconds
    public rotation: number = 0;
    public isDead: boolean = false;
    protected lastShootTime: number = Date.now();
    protected projectileClass: new (
        owner: string,
        position: Vector2D
    ) => Projectile;

    constructor(
        id: string,
        position: Vector2D,
        baseStat: TankStats,
        projectileClass: new (owner: string, position: Vector2D) => Projectile
    ) {
        super(
            id,
            position,
            new Collision(
                CollisionType.polygon,
                new Vector2D(position.x, position.y),
                [
                    new Vector2D(-20, -12),
                    new Vector2D(20, -12),
                    new Vector2D(20, 12),
                    new Vector2D(-20, 12),
                    new Vector2D(-20, -12),
                ]
            ),
            EntityType.tank
        );

        this.baseStats = baseStat;

        this.health = this.baseStats.health;
        this.turnSpeed = this.baseStats.turnSpeed;
        this.shootSpeed = this.baseStats.shootSpeed;
        this.speed = this.baseStats.speed;
        this.projectileClass = projectileClass;

        this.originalVertices = this.hitbox.vertices;
    }

    resetStats() {
        this.health = this.baseStats.health;
        this.turnSpeed = this.baseStats.turnSpeed;
        this.shootSpeed = this.baseStats.shootSpeed;
        this.speed = this.baseStats.speed;
    }

    move(map: MapData, forward: number) {
        if (this.isDead) return;

        const direction = forward ? 1 : -1;
        const variedSpeed = forward ? this.speed : this.speed * 0.4;
        let movementVector = new Vector2D(
            Math.cos(this.rotation * (Math.PI / 180)) *
                (variedSpeed * direction),
            Math.sin(this.rotation * (Math.PI / 180)) *
                (variedSpeed * direction)
        );

        let testPosition = this.position.add(movementVector);
        let testHitbox = new Collision(
            this.hitbox.collisionType,
            testPosition,
            this.hitbox.vertices.map((vertex) =>
                vertex.add(movementVector).add(this.position)
            )
        );

        let collidingWall = map.walls.find((wall) =>
            testHitbox.collidesWith(wall.collision)
        );

        while (collidingWall && movementVector.magnitude > 0.1) {
            movementVector = movementVector.multiply(0.8); // Reduce movement step faster
            testPosition = this.position.add(movementVector);
            testHitbox = new Collision(
                this.hitbox.collisionType,
                testPosition,
                this.hitbox.vertices.map((vertex) =>
                    vertex.add(movementVector).add(this.position)
                )
            );
            collidingWall = map.walls.find((wall) =>
                testHitbox.collidesWith(wall.collision)
            );
        }

        if (!collidingWall) {
            this.position = testPosition;
            this.hitbox.position = testPosition;
        }
    }

    rotate(clockwise: boolean, map: MapData) {
        if (this.isDead) return;

        const rotationSpeed = clockwise ? -1 : 1;
        const newRotation =
            (this.rotation + this.turnSpeed * rotationSpeed) % 360;
        const nextRad = (newRotation * Math.PI) / 180;
        const potentialVertices = this.originalVertices.map(({ x, y }) => {
            const rotatedX = x * Math.cos(nextRad) - y * Math.sin(nextRad);
            const rotatedY = x * Math.sin(nextRad) + y * Math.cos(nextRad);
            return new Vector2D(rotatedX, rotatedY);
        });

        const newHitbox = new Collision(
            this.hitbox.collisionType,
            this.hitbox.position.add(this.position),
            potentialVertices.map((vertex) => vertex.add(this.position))
        );

        if (!map.walls.some((wall) => newHitbox.collidesWith(wall.collision))) {
            this.rotation = newRotation;
            this.hitbox.vertices = potentialVertices;
        }
    }

    shoot() {
        const now = Date.now();
        const deltaTime = (now - this.lastShootTime) / 1000;

        if (deltaTime < this.shootSpeed / 1000) return null;

        const offsetDistance = 20; // Distance in front of the tank

        // Direction vector from tank's rotation
        const forward = Vector2D.fromAngle(this.rotation).multiply(
            offsetDistance
        );

        // Position in front of tank
        const spawnPosition = this.position.add(forward);

        const newProjectile = new this.projectileClass(this.id, spawnPosition);
        newProjectile.rotation = this.rotation;

        this.lastShootTime = now;

        return newProjectile;
    }

    takeDamage(damage: number) {
        this.health -= damage;
        if (this.health <= 0) {
            this.isDead = true;
        }
    }
}

export default Tank;
