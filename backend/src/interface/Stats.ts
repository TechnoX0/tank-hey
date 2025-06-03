import Ability from "../Abilitiese/Ability";
import { PowerUpType } from "../Utils/Enums";

interface TankStats {
    health: number;
    speed: number;
    turnSpeed: number;
    shootSpeed: number; // in milliseconds
    baseProjectileDamage?: number;
    ability: Ability<any>;
}

interface ProjectileStats {
    damage: number;
    radius?: number;
    speed?: number;
    maxTimeToLive?: number; // in milliseconds
}

interface PowerUpStats {
    duration: number;
    maxTimeOnGround: number;
    name: string;
    type: string;
    value?: number;
}

interface AbilityStats {
    duration: number;
    cooldown: number;
    name: string;
    type: string;
}

export { TankStats, ProjectileStats, PowerUpStats, AbilityStats };
