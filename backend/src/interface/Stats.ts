interface TankStats {
    health: number;
    speed: number;
    turnSpeed: number;
    shootSpeed: number; // in milliseconds
    projectiledamage: number;
}

interface ProjectileStats {
    damage: number;
    speed?: number;
    maxTimeToLive?: number; // in milliseconds
}

interface PowerUpStats {
    duration: number;
    maxTimeOnGround: number;
    value: number;
}

export { TankStats, ProjectileStats, PowerUpStats };
