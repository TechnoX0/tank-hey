export interface Dot {
    x: number;
    y: number;
}

export interface Wall {
    start: Dot;
    end: Dot;
}

export class MapSystem {
    dots: Dot[] = [];
    walls: Wall[] = [];

    draw(ctx: CanvasRenderingContext2D) {
        // Draw dots
        ctx.fillStyle = "black";
        this.dots.forEach(({ x, y }) => {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw walls
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        this.walls.forEach(({ start, end }) => {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        });
    }
}
