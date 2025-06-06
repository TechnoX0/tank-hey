// Projectile.ts
import GameObject from "../GameObject";
import Vector2D from "../../Utils/Vector2D";
import Tank from "../Tanks/Tank";
import Movement from "../../interface/Movement";
import Collision from "../../Utils/Collision";
import { CollisionType, EntityType } from "../../Utils/Enums";
import { ProjectileStats } from "../../interface/Stats";

abstract class Projectile extends GameObject implements Movement {
    public owner: string;
    public damage: number;
    public speed: number;
    public rotation: number = 0;
    public timeAlive: number = 0;
    public maxTimeAlive: number;
    public isDead: boolean = false;
    public baseStats: ProjectileStats;

    protected dealtDamageTo: Map<string, number> = new Map();
    protected damageCooldown: number = 600;

    constructor(
        owner: string,
        position: Vector2D,
        collisionType: CollisionType,
        baseStats: ProjectileStats,
        verticesOrRadius: Vector2D[] | number
    ) {
        let collision: Collision;

        if (Array.isArray(verticesOrRadius)) {
            collision = new Collision(
                collisionType,
                position,
                verticesOrRadius
            );
        } else if (typeof verticesOrRadius === "number") {
            collision = new Collision(
                collisionType,
                position,
                verticesOrRadius
            );
        } else {
            throw new Error("Invalid hitbox type passed to constructor");
        }

        super(owner, position, collision, EntityType.projectile);

        this.baseStats = baseStats;

        this.owner = owner;
        this.damage = baseStats.damage;
        this.speed = baseStats.speed || 0;
        this.maxTimeAlive = baseStats.maxTimeToLive || 0; // 10 seconds default
    }

    abstract update(...params: any): void;
    abstract move(...params: any): void;

    resetStats() {
        this.damage = this.baseStats.damage;
        this.speed = this.baseStats.speed || 0;
        this.maxTimeAlive = this.baseStats.maxTimeToLive || 0; // Reset to default if not set
        this.isDead = false;
        this.dealtDamageTo.clear();
    }

    dealDamage(target: Tank) {
        const now = Date.now();
        const lastDamageTime = this.dealtDamageTo.get(target.id);

        if (lastDamageTime && now - lastDamageTime < this.damageCooldown) {
            return; // Don't deal damage again yet
        }

        target.takeDamage(this.damage);
        this.dealtDamageTo.set(target.id, now);
    }

    shouldDestroy(): boolean {
        return this.timeAlive >= this.maxTimeAlive;
    }
}

export default Projectile;
