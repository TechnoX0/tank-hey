export interface Entity {
    activePowerUp: [];
    baseStats: {
        health: number;
        shootSpeed: number;
        speed: number;
        turnSpeed: number;
    };
    health: number;
    id: string;
    position: { x: number; y: number };
    speed: number;
    rotation: number;
    isVisible: boolean;
    hitbox: {
        type: string;
        radius: number;
        vertices: { x: number; y: number }[];
        x: number;
        y: number;
    };
    color: string;
}
