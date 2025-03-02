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
    lines: {start: { x: number; y: number }, end: { x: number; y: number }}[]
    intersection: { x: number; y: number }[]
}