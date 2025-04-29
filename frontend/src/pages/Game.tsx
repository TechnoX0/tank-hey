import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import GameListener from "../GameListener";
import { setupControls } from "../Controls";
import GameState from "../interface/GameState";
import { drawCircle, drawMap, drawTank } from "../utils/Draw";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:4000");

function Game() {
  const params = useParams<{ roomId: string }>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [gameState, setGameState] = useState<GameState>({
    id: "",
    map: {},
    players: {},
    projectiles: {},
    gameStarted: false,
  });
  const previousState = useRef<GameState>(gameState);
  const lastUpdateTime = useRef<number>(performance.now());

  useEffect(() => {
    if (!canvasRef.current) return;
    ctxRef.current = canvasRef.current.getContext("2d");
  }, []);

  useEffect(() => {
    const gameListener = new GameListener();

    const checkSocketReady = setInterval(() => {
      if (socket.id) {
        console.log("Socket ID ready:", socket.id);
        setupControls(gameListener, socket, params.roomId, socket.id);
        clearInterval(checkSocketReady);
      }
    }, 100); // Check every 100ms until socket.id is available

    socket.emit("joinRoom", params.roomId, (room: any) => {
      console.log("Joined room:", room);
    });

    socket.on("gameState", (newGameState: GameState) => {
      lastUpdateTime.current = performance.now();
      previousState.current = gameState;
      setGameState(newGameState);
    });

    gameListener.start();

    return () => {
      socket.off("gameState");
      gameListener.stop();
    };
  }, [params.roomId]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!ctxRef.current) return;
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, 1280, 720);

      Object.keys(gameState.players).forEach((playerId) => {
        const player = gameState.players[playerId];
        drawTank(player, ctx, playerId == socket.id);
      });

      Object.keys(gameState.projectiles).forEach((projectilesId) => {
        const projectile = gameState.projectiles[projectilesId];
        console.log(projectile);
        drawCircle(
          "#295C0A",
          projectile.position,
          projectile.hitbox.radius,
          ctx
        );
      });

      drawMap(gameState.map, ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        className="bg-blue-100"
      />
    </div>
  );
}

export default Game;
