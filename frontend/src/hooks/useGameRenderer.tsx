import { Socket } from "socket.io-client";
import GameState from "../interface/GameState";
import { drawCircle, drawMap, drawTank } from "../utils/draw";
import { Entity } from "../interface/Entity";

function useGameRenderer(
  canvas: HTMLCanvasElement | null,
  ctx: CanvasRenderingContext2D | null,
  gameState: GameState,
  socket: Socket
) {
  if (!canvas || !ctx || !gameState.gameStarted) return;
  let animationFrameId: number;

  const renderFrame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const [id, player] of Object.entries(gameState.players) as [
      string,
      any
    ][]) {
      drawTank(player.tank, ctx, id === socket.id);
    }

    for (const projectile of Object.values(gameState.projectiles) as Entity[]) {
      drawCircle("#295C0A", projectile.position, projectile.hitbox.radius, ctx);
    }

    drawMap(gameState.map, ctx);
    animationFrameId = requestAnimationFrame(renderFrame);
  };

  renderFrame();
  return () => cancelAnimationFrame(animationFrameId);
}

export default useGameRenderer;
