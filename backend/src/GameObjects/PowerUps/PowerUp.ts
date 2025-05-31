import { PowerUpStats } from "../../interface/Stats";
import Collision from "../../Utils/Collision";
import { CollisionType, EntityType } from "../../Utils/Enums";
import Vector2D from "../../Utils/Vector2D";
import GameObject from "../GameObject";
import Tank from "../Tanks/Tank";

abstract class PowerUp extends GameObject {
    public stats: PowerUpStats;
    public timeActive: number = 0;
    public timeOnGround: number = 0;
    public isActive: boolean = false;
    public isExpired: boolean = false;
    public isPickedUp: boolean = false;

    constructor(id: string, position: Vector2D, stats: PowerUpStats) {
        super(
            id,
            position,
            new Collision(
                CollisionType.circle,
                position,
                5 // Default radius for power-up
            ),
            EntityType.powerup
        );
        this.stats = stats;
    }

    update(deltaTime: number): void {
        if (this.isActive) {
            this.timeActive += deltaTime;

            if (this.timeActive >= this.stats.duration) {
                this.isActive = false; // Deactivate power-up after duration
            }
        }
    }

    updateOnGround(deltaTime: number): void {
        if (!this.isExpired) {
            this.timeOnGround += deltaTime;

            if (this.timeOnGround >= this.stats.maxTimeOnGround) {
                this.isExpired = true; // Remove power-up after max time on ground
            }
        }
    }

    abstract applyEffect(target: Tank): void;
    abstract removeEffect(target: Tank): void;
}

export default PowerUp;
