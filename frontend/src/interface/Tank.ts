import { Entity } from "./Entity";

export function drawTank(player: Entity, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.beginPath();

    player.hitbox.vertices.forEach(({ x: relX, y: relY }, index) => {
        if(!player.position.x) return

        if (index === 0) {
            ctx.moveTo(player.position.x + relX, player.position.y + relY);
        } else {
            ctx.lineTo(player.position.x + relX, player.position.y + relY);
        }
    });

    ctx.closePath();
    ctx.fill();
}