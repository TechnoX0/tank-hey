import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import GameListener from "../GameListener";
import { setupControls } from "../Controls";
import GameState from "../interface/GameState";
import { drawCircle, drawMap, drawTank } from "../utils/draw";
import useGameRenderer from "../hooks/GameRenderer";

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

  useGameRenderer(canvasRef.current, ctxRef.current, gameState, socket);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        className={`bg-blue-100 ${!gameState.gameStarted ? "hidden" : ""}`}
      />
    </div>
  );
}

export default Game;
