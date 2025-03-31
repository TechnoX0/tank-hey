import GameObject from "../GameObjects/GameObject";
import Movement from "../interface/Movement";
import Vector2D from "../Utils/Vector2D";
import MapData from "../interface/MapData";
import { CollisionType } from "../Utils/Enums";
import Collision from "../Utils/Collision";
import Projectile from "../Projectiles/Projectile";
import CannonBall from "../Projectiles/CannonBall";

class Tank extends GameObject implements Movement {
    public health: number;
    public speed: number = 5;
    public rotation: number = 0;
    public turnSpeed: number = 3;
    public projectile: Projectile = new CannonBall("", this.position)

    constructor(id: string, position: Vector2D) {
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
        this.health = 100;
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
}

export default Tank;
