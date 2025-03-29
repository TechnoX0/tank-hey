import { Vector2D } from "./Vector2D";

export interface Wall {
    corners: Vector2D[]
}

export class MapSystem {
    walls: Wall[] = [];

    // draw(ctx: CanvasRenderingContext2D) {
    //     // Draw walls
    //     ctx.strokeStyle = "blue";
    //     ctx.lineWidth = 2;
    //     console.log(this.walls)
    //     this.walls.forEach(({ start, end }) => {
    //         ctx.beginPath();
    //         ctx.moveTo(start.x, start.y);
    //         ctx.lineTo(end.x, end.y);
    //         ctx.stroke();
    //     });
    // }
}
