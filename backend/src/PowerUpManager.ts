import Wall from "./Maps/Wall";
import { generateCustomUUID } from "./Utils/Utils";
import Vector2D from "./Utils/Vector2D";
import DoubleDamage from "./GameObjects/PowerUps/DoubleDamage";
import PowerUp from "./GameObjects/PowerUps/PowerUp";
import SpeedBoost from "./GameObjects/PowerUps/SpeedBoost";
import InvertControl from "./GameObjects/PowerUps/InvertControl";
import StopMovement from "./GameObjects/PowerUps/StopMovement";
import Disarm from "./GameObjects/PowerUps/Disarm";
import UniformGridManager from "./UniformGridManager";

class PowerUpManager {
    public powerUps: Record<string, PowerUp<any>> = {};
    private walls: Wall[] = [];
    private grid: UniformGridManager;

    private spawnCooldown = this.getRandomSpawnCooldown();
    private timeSinceLastSpawn = 0;

    constructor(walls: Wall[], grid: UniformGridManager) {
        this.walls = walls;
        this.grid = grid;
    }

    update(deltaTime: number): void {
        const powerUpIds = Object.keys(this.powerUps);
        const powerUpCount = powerUpIds.length;

        if (powerUpCount < 3) {
            this.timeSinceLastSpawn += (deltaTime / 60) * 1000;
            if (this.timeSinceLastSpawn >= this.spawnCooldown) {
                this.spawnPowerUp();
                this.timeSinceLastSpawn = 0;
                this.spawnCooldown = this.getRandomSpawnCooldown();
            }
        }

        for (const id of Object.keys(this.powerUps)) {
            const powerUp = this.powerUps[id];

            powerUp.update(deltaTime);
            if (powerUp.isActive) {
                powerUp.updateOnGround(deltaTime);
            }
        }

        this.removedPickedUpOrExpired();
    }

    getRandomSpawnCooldown(): number {
        // Return a random time between 10 and 20 seconds (in milliseconds)
        return (10 + Math.random() * 10) * 1000;
    }

    spawnPowerUp(vector?: Vector2D): void {
        const maxAttempts = 50;
        let attempts = 0;

        while (attempts < maxAttempts) {
            const spawnX = Math.random() * 1000; // replace with your map width
            const spawnY = Math.random() * 600; // replace with your map height
            const position = vector || new Vector2D(spawnX, spawnY);

            const candidate = this.getRandomPowerUp(position);

            const collides = this.walls.some((wall) =>
                candidate.hitbox.collidesWith(wall.collision)
            );

            if (!collides) {
                this.powerUps[candidate.id] = candidate;
                console.log("Spawned power-up at", position);
                return;
            }

            attempts++;
        }

        console.warn("Failed to spawn a power-up after multiple attempts.");
    }

    getRandomPowerUp(position: Vector2D): PowerUp<any> {
        const id = generateCustomUUID();

        const buffs = [
            () => new DoubleDamage(id, position),
            () => new SpeedBoost(id, position),
        ];

        const debuffs = [
            () => new InvertControl(id, position),
            () => new StopMovement(id, position),
            () => new Disarm(id, position),
        ];

        const isBuff = Math.random() < 0.65; // 65% chance for buff
        const pool = isBuff ? buffs : debuffs;

        const randomIndex = Math.floor(Math.random() * pool.length);
        return pool[randomIndex]();
    }

    removedPickedUpOrExpired() {
        for (const id of Object.keys(this.powerUps)) {
            const powerUp = this.powerUps[id];

            if (powerUp.isExpired || powerUp.isPickedUp) {
                delete this.powerUps[id];
            }
        }
    }
}

export default PowerUpManager;
