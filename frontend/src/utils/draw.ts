import { Entity } from "../interface/Entity";
import { Map, Wall } from "../interface/Map";
import { Vector2D } from "../interface/Vector2D";

export function drawTank(player: Entity, ctx: CanvasRenderingContext2D, isPlayer: boolean) {
    if (!player.hitbox?.vertices) return;
    const color = isPlayer ? "blue" : "red"
    ctx.fillStyle = color;
    ctx.beginPath();

    player.hitbox.vertices.forEach(({ x: relX, y: relY }, index) => {
        if (!player.position || !player.position.x) return;

        if (index === 0) {
            ctx.moveTo(player.position.x + relX, player.position.y + relY);
        } else {
            ctx.lineTo(player.position.x + relX, player.position.y + relY);
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