export interface Entity {
    position: {x: number, y: number}
    speed: number;
    rotation: number;
    hitbox: {
        type: string;
        radius: number;
        vertices: { x: number; y: number }[];
        x: number;
        y: number;
    };
    color: string;
}