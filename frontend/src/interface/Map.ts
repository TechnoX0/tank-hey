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
    selectedDot: Dot | null = null;

    constructor(private width: number, private height: number, private spacing: number) {
        this.generateDots();
    }

    private generateDots() {
        for (let y = 0; y <= this.height; y += this.spacing) {
            for (let x = 0; x <= this.width; x += this.spacing) {
                this.dots.push({ x, y });
            }
        }
    }

    handleClick(x: number, y: number) {
        const clickedDot = this.dots.find(dot => Math.hypot(dot.x - x, dot.y - y) < 10);
        if (!clickedDot) return;

        if (!this.selectedDot) {
            this.selectedDot = clickedDot;
        } else {
            this.walls.push({ start: this.selectedDot, end: clickedDot });
            this.selectedDot = null;
        }
    }

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
