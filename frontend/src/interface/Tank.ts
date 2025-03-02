import { Entity } from "./Entity";

export function drawTank(player: Entity, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
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
    
    drawIntersect(player, ctx)
    drawLines(player, ctx)
}

function drawIntersect(player: Entity, ctx: CanvasRenderingContext2D) {
    console.log(player.intersection)

    for (const intersection of player.intersection) {
        ctx.fillStyle = "red";
    
        ctx.beginPath()
        ctx.moveTo(intersection.x, intersection.y)
        ctx.arc(intersection.x, intersection.y, 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
}

function drawLines(player: Entity, ctx: CanvasRenderingContext2D) {
    for (const line of player.lines) {
        ctx.beginPath()
        ctx.moveTo(line.start.x, line.start.y)
        ctx.lineTo(line.end.x, line.end.y)
        ctx.closePath()
        ctx.stroke()
    }
}