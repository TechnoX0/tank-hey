import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import GameListener from "../GameListener";
import { setupControls } from "../Controls";
import GameState from "../interface/GameState";
import useGameRenderer from "../hooks/useGameRenderer";
import { useGameSocket } from "../hooks/useGameSocket";

const socketURL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";
const socket = io(socketURL);
const canvasWidth = 1000;
const canvasHeight = 600;

function Game() {
  const params = useParams<{ roomId: string }>();
  const roomId = params.roomId || "";
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [gameState, setGameState] = useState<GameState>({
    id: "",
    map: {},
    players: {},
    projectiles: {},
    gameStarted: false,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    ctxRef.current = canvasRef.current.getContext("2d");
  }, []);

  useGameSocket(socket, roomId, setGameState);
  useGameRenderer(canvasRef.current, ctxRef.current, gameState, socket);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className={`bg-blue-100 ${!gameState.gameStarted ? "hidden" : ""}`}
      />
    </div>
  );
}

export default Game;
