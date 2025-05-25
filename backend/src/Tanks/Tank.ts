import GameObject from "../GameObjects/GameObject";
import Movement from "../interface/Movement";
import Vector2D from "../Utils/Vector2D";
import { MapData } from "../interface/Map";
import { CollisionType } from "../Utils/Enums";
import Collision from "../Utils/Collision";
import Projectile from "../Projectiles/Projectile";
import Stats from "../interface/Stats";

abstract class Tank extends GameObject implements Movement {
    protected baseStats: Stats;

    // Current stats
    public health: number;
    public speed: number;
    public turnSpeed: number;
    public shootSpeed: number; // milliseconds
    public rotation: number = 0;
    protected lastShootTime: number = Date.now();
    protected projectileClass: new (owner: string, position: Vector2D) => Projectile;

    constructor(id: string, position: Vector2D, baseStat: Stats, projectileClass: new (owner: string, position: Vector2D) => Projectile) {
        super(
            id,
            position,
            new Collision(CollisionType.polygon, new Vector2D(position.x, position.y), [
                new Vector2D(-15, -10),
                new Vector2D(15, -10),
                new Vector2D(15, 10),
                new Vector2D(-15, 10),
                new Vector2D(-15, -10),
            ]),
        );

        this.baseStats = baseStat;

        this.health = this.baseStats.health;
        this.turnSpeed = this.baseStats.turnSpeed;
        this.shootSpeed = this.baseStats.shootSpeed;
        this.speed = this.baseStats.speed;
        this.projectileClass = projectileClass;

        this.originalVertices = this.hitbox.vertices;
    }

    move(map: MapData, forward: number) {
        const direction = forward ? 1 : -1;
        const variedSpeed = forward ? this.speed : this.speed * .4
        let movementVector = new Vector2D(
            Math.cos(this.rotation * (Math.PI / 180)) * (variedSpeed * direction),
            Math.sin(this.rotation * (Math.PI / 180)) * (variedSpeed * direction)
        );
        
        let testPosition = this.position.add(movementVector);
        let testHitbox = new Collision(
            this.hitbox.collisionType,
            testPosition,
            this.hitbox.vertices.map(vertex => vertex.add(movementVector).add(this.position))
        );
        
        let collidingWall = map.walls.find(wall => testHitbox.collidesWith(wall.collision));
        
        while (collidingWall && movementVector.magnitude > 0.1) {
            movementVector = movementVector.multiply(.8); // Reduce movement step faster
            testPosition = this.position.add(movementVector);
            testHitbox = new Collision(
                this.hitbox.collisionType,
                testPosition,
                this.hitbox.vertices.map(vertex => vertex.add(movementVector).add(this.position))
            );
            collidingWall = map.walls.find(wall => testHitbox.collidesWith(wall.collision));
        }
        
        if (!collidingWall) {
            this.position = testPosition;
            this.hitbox.position = testPosition;
        }
    }

    rotate(clockwise: boolean, map: MapData) {
        const rotationSpeed = clockwise ? -1 : 1
        const newRotation = (this.rotation + (this.turnSpeed * rotationSpeed)) % 360;
        const nextRad = (newRotation * Math.PI) / 180;
        const potentialVertices = this.originalVertices.map(({ x, y }) => {
            const rotatedX = x * Math.cos(nextRad) - y * Math.sin(nextRad);
            const rotatedY = x * Math.sin(nextRad) + y * Math.cos(nextRad);
            return new Vector2D(rotatedX, rotatedY);
        });
        
        const newHitbox = new Collision(
            this.hitbox.collisionType,
            this.hitbox.position.add(this.position),
            potentialVertices.map(vertex => vertex.add(this.position))
        );
        
        if (!map.walls.some(wall => newHitbox.collidesWith(wall.collision))) {
            this.rotation = newRotation;
            this.hitbox.vertices = potentialVertices;
        }
    }

    shoot() {
        const now = Date.now();
        const deltaTime = (now - this.lastShootTime) / 1000; // Convert to seconds

        if (deltaTime < this.shootSpeed / 1000) return null; // Prevent shooting too fast

        const newProjectile = new this.projectileClass(this.id, new Vector2D(this.position.x, this.position.y));
        newProjectile.rotation = this.rotation;

        this.lastShootTime = now; // Update last shoot time

        return newProjectile;
    }
}

export default Tank;