// Projectile.ts
import GameObject from "../GameObjects/GameObject";
import Vector2D from "../Utils/Vector2D";
import Tank from "../Tanks/Tank";
import Movement from "../interface/Movement";
import Collision from "../Utils/Collision";
import { CollisionType } from "../Utils/Enums";

abstract class Projectile extends GameObject implements Movement {
    public owner: string;
    public damage: number;
    public speed: number;
    public rotation: number = 0;
    public timeAlive: number;
    public maxTimeAlive: number;

    constructor(owner: string, position: Vector2D, collisionType: CollisionType, verticesOrRadius: Vector2D[] | number) {
        let collision: Collision;
    
        if (Array.isArray(verticesOrRadius)) {
            collision = new Collision(collisionType, position, verticesOrRadius);
        } else if (typeof verticesOrRadius === "number") {
            collision = new Collision(collisionType, position, verticesOrRadius);
        } else {
            throw new Error("Invalid hitbox type passed to constructor");
        }
    
        super(owner, position, collision);

        this.owner = owner;
        this.damage = 1;
        this.speed = 10;
        this.timeAlive = 0;
        this.maxTimeAlive = 10000; // 10 seconds default
    }

    abstract update(...params: any): void;
    abstract move(...params: any): void;
    abstract rotate(clockwise: boolean): void;

    dealDamage(target: Tank) {
        target.health -= this.damage;
    }

    shouldDestroy(): boolean {
        return this.timeAlive >= this.maxTimeAlive;
    }
}

export default Projectile;