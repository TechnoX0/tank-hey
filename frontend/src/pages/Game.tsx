import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import GameListener from "../GameListener";
import { setupControls } from "../Controls";
import { drawTank } from "../interface/Tank";
import GameState from "../interface/GameState";
import { Wall } from "../interface/Map";

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

      Object.keys(gameState.players).forEach((players) => {
        const player = gameState.players[players];
        drawTank(player, ctx);
      });

      console.log(gameState.map);

      // drawMap(gameState);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  const drawMap = (gameState: GameState) => {
    if (!ctxRef.current || !gameState.map.walls) return;
    const ctx = ctxRef.current;

    gameState.map.walls.forEach((wall: Wall) => {
      ctx.beginPath();
      ctx.moveTo(wall.corners[0].x, wall.corners[0].y);
      wall.corners.forEach((corner) => {
        ctx.lineTo(corner.x, corner.y);
      });
      ctx.fill();
    });
  };

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
