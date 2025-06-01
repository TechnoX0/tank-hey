import Wall from "../../Maps/Wall";
import { generateCustomUUID } from "../../Utils/Utils";
import Vector2D from "../../Utils/Vector2D";
import DoubleDamage from "./DoubleDamage";
import PowerUp from "./PowerUp";

class PowerUpManager {
    public powerUps: Record<string, PowerUp<any>> = {};
    private walls: Wall[] = [];

    constructor(walls: Wall[]) {
        this.walls = walls;
        this.spawnPowerUp(new Vector2D(50, 100));
    }

    update(deltaTime: number): void {
        const powerUpIds = Object.keys(this.powerUps);
        const powerUpCount = powerUpIds.length;

        if (powerUpCount === 0) {
            this.spawnPowerUp();
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

    spawnPowerUp(vector?: Vector2D): void {
        const maxAttempts = 50;
        let attempts = 0;

        while (attempts < maxAttempts) {
            const spawnX = Math.random() * 1000; // replace with your map width
            const spawnY = Math.random() * 600; // replace with your map height
            const position = vector || new Vector2D(spawnX, spawnY);

            const candidate = new DoubleDamage(generateCustomUUID(), position);

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

    removedPickedUpOrExpired() {
        for (const id of Object.keys(this.powerUps)) {
            const powerUp = this.powerUps[id];

            if (powerUp.isExpired) {
                delete this.powerUps[id];
                continue;
            }

            if (powerUp.isPickedUp) {
                delete this.powerUps[id];
                continue;
            }
        }
    }
}

export default PowerUpManager;
