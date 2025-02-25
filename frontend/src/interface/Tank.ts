import { Entity } from "./Entity";

export function drawTank(player: Entity, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = player.color;
    ctx.beginPath();

    player.hitbox.vertices.forEach(({ x: relX, y: relY }, index) => {
        if (index === 0) {
            ctx.moveTo(player.position.x + relX, player.position.y + relY);
        } else {
            ctx.lineTo(player.position.x + relX, player.position.y + relY);
        }
    });

    ctx.closePath();
    ctx.fill();
}