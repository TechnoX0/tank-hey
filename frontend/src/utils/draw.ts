import { Map, Wall } from "../interface/Map";
import Player from "../interface/Player";
import { Vector2D } from "../interface/Vector2D";
import { loadTankImage } from "./Image";

export function drawTank(player: Player, ctx: CanvasRenderingContext2D) {
    const tank = player.tank;
    if (!tank.hitbox?.vertices) return;

    const tankImage = loadTankImage(player.tankClass);

    // Draw the image if loaded
    if (tankImage && tankImage.complete) {
        const width = 40;
        const height = 40;
        const spriteOffsetDeg = 90;
        const finalRotation = tank.rotation + spriteOffsetDeg;

        ctx.save();
        ctx.translate(tank.position.x, tank.position.y);
        ctx.rotate((finalRotation * Math.PI) / 180);
        ctx.drawImage(tankImage, -width / 2, -height / 2, width, height);
        // const imageData = changeSpriteColor(
        //     -width / 2,
        //     -height / 2,
        //     ctx.canvas,
        //     ctx
        // );
        // ctx.putImageData(imageData, tank.position.x, tank.position.y);
        ctx.restore();
        return;
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
    ctx: CanvasRenderingContext2D
) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(location.x, location.y);
    ctx.arc(location.x, location.y, radius, 0, Math.PI * 2, false);
    ctx.fill();
}
