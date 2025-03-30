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

    constructor(owner: string, position: Vector2D, hitbox: CollisionType) {
        super(position, new Collision(hitbox, new Vector2D(position.x, position.y),));
        this.owner = owner;
        this.damage = 1;
        this.speed = 10;
        this.timeAlive = 0;
        this.maxTimeAlive = 10000; // 10 seconds default
    }

    abstract move(canvasWidth: number, canvasHeight: number, ...params: any): void;
    abstract rotate(angle: number): void;

    dealDamage(target: Tank) {
        target.health -= this.damage;
    }

    shouldDestroy(): boolean {
        return this.timeAlive >= this.maxTimeAlive;
    }
}

export default Projectile;