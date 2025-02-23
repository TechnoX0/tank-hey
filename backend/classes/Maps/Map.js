class Map {
    constructor(width, height, spacing) {
        this.width = width;
        this.height = height;
        this.spacing = spacing;
        this.dots = [];
        this.walls = [];
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        this.dots.forEach(({ x, y }) => {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });

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
