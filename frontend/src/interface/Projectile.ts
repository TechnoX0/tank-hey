import { Entity } from "./Entity";

export function drawProjectile(projectile: Entity, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = projectile.color;
    ctx.beginPath();

    ctx.arc(projectile.position.x, projectile.position.y, projectile.hitbox.radius, 0, 2 * Math.PI);

    ctx.closePath();
    ctx.fill();
}