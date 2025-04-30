import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import GameState from "../interface/GameState";
import useGameRenderer from "../hooks/useGameRenderer";
import { useGameSocket } from "../hooks/useGameSocket";
import { getSocket } from "../Socket";

const socket = getSocket();
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
    <main>
      <div className={`${gameState.gameStarted ? "hidden" : ""}`}>
        <div>
          <h1>Classes</h1>
          <input
            type="radio"
            name="tank-class"
            id="juggernaut"
            value="juggernaut"
            checked
          />
          <label htmlFor="juggernaut">Juggernaut</label>
          <input type="radio" name="tank-class" id="sniper" value="sniper" />
          <label htmlFor="sniper">Sniper</label>
        </div>
      </div>
      <div className={`${!gameState.gameStarted ? "hidden" : ""}`}>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className={`bg-blue-100 ${!gameState.gameStarted ? "hidden" : ""}`}
        />
      </div>
    </main>
  );
}

export default Game;
