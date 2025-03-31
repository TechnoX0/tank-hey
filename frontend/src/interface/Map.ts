import { Vector2D } from "./Vector2D";

export interface Map {
    name: string;
    walls: Wall[];
}

export interface Wall {
    corners: Vector2D[]
}
