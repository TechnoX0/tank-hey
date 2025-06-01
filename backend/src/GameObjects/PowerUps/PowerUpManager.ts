import { generateCustomUUID } from "../../Utils/Utils";
import Vector2D from "../../Utils/Vector2D";
import DoubleDamage from "./DoubleDamage";
import PowerUp from "./PowerUp";

class PowerUpManager {
    public powerUps: Record<string, PowerUp<any>> = {};

    update(deltaTime: number): void {
        const powerUpIds = Object.keys(this.powerUps);
        const powerUpCount = powerUpIds.length;

        if (powerUpCount === 0) {
            const newPowerUpId = generateCustomUUID();
            const newPowerUp = new DoubleDamage(
                newPowerUpId,
                new Vector2D(50, 200)
            );

            this.powerUps[newPowerUpId] = newPowerUp;
        }

        for (const id of Object.keys(this.powerUps)) {
            const powerUp = this.powerUps[id];
            powerUp.update(deltaTime);
            if (powerUp.isActive) {
                powerUp.updateOnGround(deltaTime);
            }
        }

        for (const id of Object.keys(this.powerUps)) {
            const powerUp = this.powerUps[id];
            if (powerUp.isExpired) {
                delete this.powerUps[id];
            }
        }
    }
}

export default PowerUpManager;
