import { Map, Wall } from "../interface/Map";
import Player from "../interface/Player";
import { Vector2D } from "../interface/Vector2D";

export function drawTank(player: Player, ctx: CanvasRenderingContext2D) {
    const tank = player.tank;
    if (!tank.hitbox?.vertices) return;
    ctx.fillStyle = player.color || "#000000";
    ctx.beginPath();

    tank.hitbox.vertices.forEach(({ x: relX, y: relY }, index) => {
        if (!tank.position || !tank.position.x) return;

        if (index === 0) {
            ctx.moveTo(tank.position.x + relX, tank.position.y + relY);
        } else {
            ctx.lineTo(tank.position.x + relX, tank.position.y + relY);
        }
    });

    ctx.closePath();
    ctx.fill();
}

export function drawMap(map: Map, ctx: CanvasRenderingContext2D) {
    if (!map || !map.walls) return;
    ctx.fillStyle = "black"

    map.walls.forEach((wall: Wall) => {
        drawPolygons("#7D7D7D", wall.corners, ctx)
    });
};

export function drawPolygons(color: string, vertices: Vector2D[], ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(vertices[0].x, vertices[0].y)

    vertices.forEach(vertex => {
        ctx.lineTo(vertex.x, vertex.y);
    })

    ctx.fill()
}

export function drawCircle(color: string, location: Vector2D, radius: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(location.x, location.y)
    ctx.arc(location.x, location.y, radius, 0, Math.PI * 2, false)
    ctx.fill()
}