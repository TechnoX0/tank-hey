import { Hitbox } from "./Hitbox";
import Vertices from "./interface/Vertices";

abstract class Entity {
    public x: number;
    public y: number;
    public speed: number;
    public rotation: number;
    public hitbox: Hitbox;
    public color: string;
    public originalVertices: Vertices[];

    constructor(x: number, y: number, speed: number, hitbox: Hitbox, rotation: number = 0) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.rotation = rotation;
        this.hitbox = hitbox;
        this.color = "orange";

        this.originalVertices = hitbox.vertices;
    }

    abstract move(canvasWidth:number, canvasHeight:number, ...params: any): void;

    rotate(angle: number) {
        this.rotation = (this.rotation + angle) % 360;
        const rad = (this.rotation * Math.PI) / 180;

        this.hitbox.vertices = this.originalVertices.map(({ x, y }) => {
            const rotatedX = x * Math.cos(rad) - y * Math.sin(rad);
            const rotatedY = x * Math.sin(rad) + y * Math.cos(rad);

            return { x: rotatedX, y: rotatedY };
        });
    }
}

export default Entity;
