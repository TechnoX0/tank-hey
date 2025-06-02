import Wall from "./Maps/Wall";
import { generateCustomUUID } from "./Utils/Utils";
import Vector2D from "./Utils/Vector2D";
import DoubleDamage from "./GameObjects/PowerUps/DoubleDamage";
import PowerUp from "./GameObjects/PowerUps/PowerUp";
import SpeedBoost from "./GameObjects/PowerUps/SpeedBoost";
import InvertControl from "./GameObjects/PowerUps/InvertControl";
import StopMovement from "./GameObjects/PowerUps/StopMovement";

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

        // In the future, you can add more types here
        const powerUpTypes = [
            // () => new DoubleDamage(id, position),
            // () => new SpeedBoost(id, position),
            () => new InvertControl(id, position),
            // () => new StopMovement(id, position),
            // () => new Disarm(id, position),
        ];

        const randomIndex = Math.floor(Math.random() * powerUpTypes.length);
        return powerUpTypes[randomIndex]();
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
