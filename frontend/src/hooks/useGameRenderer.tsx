import { useEffect, useRef } from "react";
import GameState from "../interface/GameState";
import { drawCircle, drawMap, drawTank } from "../utils/draw";
import { Entity } from "../interface/Entity";
import { Socket } from "socket.io-client";
import Player from "../interface/Player";

export default function useGameRenderer(
    canvas: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D | null,
    gameState: GameState,
    socket: Socket
) {
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (!canvas || !ctx || !gameState.gameStarted) return;

        const renderFrame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const powerUp of Object.values(
                gameState.powerUps
            ) as Entity[]) {
                drawCircle(
                    "#FF0000",
                    powerUp.position,
                    powerUp.hitbox.radius,
                    ctx
                );
            }

            for (const player of Object.values(gameState.players) as Player[]) {
                if (!player.tank.isVisible && socket.id != player.id) continue;
                drawTank(player, ctx);
            }

            for (const projectile of Object.values(
                gameState.projectiles
            ) as Entity[]) {
                drawCircle(
                    "#295C0A",
                    projectile.position,
                    projectile.hitbox.radius,
                    ctx
                );
                console.log(projectile);
            }

            drawMap(gameState.map, ctx);

            animationRef.current = requestAnimationFrame(renderFrame);
        };

        renderFrame(); // start loop

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [canvas, ctx, gameState, socket]);
}
