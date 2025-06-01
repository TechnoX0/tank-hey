import { PowerUpType } from "../Utils/Enums";

interface TankStats {
    health: number;
    speed: number;
    turnSpeed: number;
    shootSpeed: number; // in milliseconds
}

interface ProjectileStats {
    damage: number;
    speed?: number;
    maxTimeToLive?: number; // in milliseconds
}

interface PowerUpStats {
    duration: number;
    maxTimeOnGround: number;
    name: string;
    type: string;
    value: number;
}

export { TankStats, ProjectileStats, PowerUpStats };
