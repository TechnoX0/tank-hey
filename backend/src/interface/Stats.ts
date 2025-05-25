interface TankStats {
    health: number;
    speed: number;
    turnSpeed: number;
    shootSpeed: number; // in milliseconds
}

interface ProjectileStats {
    damage: number;
    speed: number;
    maxTimeToLive: number; // in milliseconds
}

export { TankStats, ProjectileStats };