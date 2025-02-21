import { Player } from "./Player";

export function drawTank(player: Player, ctx: CanvasRenderingContext2D) {
    if (!ctx) return;

    ctx.fillStyle = player.color;
    ctx.beginPath();

    player.hitbox.vertices.forEach(({ x: relX, y: relY }, index) => {
        if (index === 0) {
            ctx.moveTo(player.x + relX, player.y + relY);
        } else {
            ctx.lineTo(player.x + relX, player.y + relY);
        }
    });

    ctx.closePath();
    ctx.fill();

    
}