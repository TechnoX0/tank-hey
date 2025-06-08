import { Map, Wall } from "../interface/Map";
import Player from "../interface/Player";
import { Vector2D } from "../interface/Vector2D";
import { loadImage } from "./Image";

export function drawTank(
    player: Player,
    isOwner: boolean,
    ctx: CanvasRenderingContext2D
) {
    const tank = player.tank;
    if (!tank.hitbox?.vertices) return;

    loadImage(`/assets/TankSprites/Tank ${player.color}.png`).then((img) => {
        const width = 40;
        const height = 40;
        const spriteOffsetDeg = 90;
        const finalRotation = tank.rotation + spriteOffsetDeg;

        ctx.save();
        ctx.translate(tank.position.x, tank.position.y);
        ctx.rotate((finalRotation * Math.PI) / 180);

        ctx.globalAlpha = isOwner && !player.tank.isVisible ? 0.3 : 1;

        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        ctx.restore();
        return;
    });
}

export function drawPowerUp(powerUp: any, ctx: CanvasRenderingContext2D) {
    loadImage("/assets/Power up.png").then((img) => {
        const radius = powerUp.hitbox.radius;
        const diameter = radius * 2;

        ctx.save();
        ctx.translate(powerUp.position.x, powerUp.position.y);
        ctx.drawImage(img, -radius, -radius, diameter, diameter);
        ctx.restore();
    });
}

export function drawAbility(player: Player, ctx: CanvasRenderingContext2D) {
    const tank = player.tank;
    const abilityType = tank.ability.stats.type;

    switch (abilityType) {
        case "iron-focus":
            ctx.save();
            ctx.fillStyle = "gold";
            ctx.globalAlpha = 0.25;
            ctx.beginPath();
            ctx.arc(tank.position.x, tank.position.y, 30, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
            break;
        case "fortess":
            ctx.save();
            ctx.strokeStyle = "cyan";
            ctx.lineWidth = 3;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(tank.position.x, tank.position.y, 30, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
            break;
        default:
            break;
    }
}

export function drawMap(map: Map, ctx: CanvasRenderingContext2D) {
    if (!map || !map.walls) return;
    ctx.fillStyle = "black";

    map.walls.forEach((wall: Wall) => {
        drawPolygons("#7D7D7D", wall.corners, ctx);
    });
}

export function drawPolygons(
    color: string,
    vertices: Vector2D[],
    ctx: CanvasRenderingContext2D
) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);

    vertices.forEach((vertex) => {
        ctx.lineTo(vertex.x, vertex.y);
    });

    ctx.fill();
}

export function drawCircle(
    color: string,
    location: Vector2D,
    radius: number,
    ctx: CanvasRenderingContext2D,
    fill?: string
) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(location.x, location.y);
    ctx.arc(location.x, location.y, radius, 0, Math.PI * 2, false);
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}
