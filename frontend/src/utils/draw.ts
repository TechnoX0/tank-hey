import { Entity } from "../interface/Entity";
import { Map, Wall } from "../interface/Map";

export function drawTank(player: Entity, ctx: CanvasRenderingContext2D, isPlayer: boolean) {
    if (!player.hitbox?.vertices) return;
    ctx.fillStyle = isPlayer ? "blue" : "black";
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
        ctx.beginPath();
        ctx.moveTo(wall.corners[0].x, wall.corners[0].y);
        wall.corners.forEach((corner) => {
        ctx.lineTo(corner.x, corner.y);
        });
        ctx.fill();
    });
};