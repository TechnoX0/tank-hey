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
  const classes = ["juggernaut", "sniper"];
  const colors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
  ];
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [gameState, setGameState] = useState<GameState>({
    id: "",
    map: {},
    players: {},
    projectiles: {},
    gameStarted: false,
  });
  const [lobbyState, setLobbyState] = useState<any>();

  useEffect(() => {
    socket.emit("getRoomState", roomId, (state: any) => {
      console.log("Lobby state:", state);
      setLobbyState(state);
    });

    socket.on("updateLobby", (state: string) => {
      console.log("Lobby updated:", state);
      setLobbyState(state);
    });

    return () => {
      socket.off("updateLobby");
    };
  }, [roomId]);

  useEffect(() => {
    if (!canvasRef.current) return;
    ctxRef.current = canvasRef.current.getContext("2d");
  }, [gameState.gameStarted]);

  useEffect(() => {
    if (!gameState.gameStarted) {
      socket.emit("updateLobby", roomId, {
        playerId: socket.id,
        selectedClass,
        selectedColor,
      });
    }
  }, [selectedClass, selectedColor]);

  function startGame() {
    socket.emit("startGame", roomId, (gameState: GameState) => {
      console.log(gameState);
      setGameState(gameState);
    });
  }

  useGameSocket(socket, roomId, setGameState);
  useGameRenderer(canvasRef.current, ctxRef.current, gameState, socket);

  return (
    <main className="grid place-items-center h-screen w-screen bg-whitee box-border">
      <div
        style={{ width: canvasWidth, height: canvasHeight }}
        className={`bg-[#EDEDED] ${gameState.gameStarted ? "hidden" : ""}`}
      >
        <div>
          <h1>Classes</h1>
          {classes.map((className) => (
            <div key={className}>
              <input
                type="radio"
                name="tankClass"
                id={className}
                value={className}
                checked={selectedClass === className}
                onChange={(e) => setSelectedClass(e.target.value)}
              />
              <label htmlFor={className}>
                {className.charAt(0).toUpperCase() + className.slice(1)}
              </label>
            </div>
          ))}
        </div>
        <div>
          {colors.map((color) => (
            <div key={color}>
              <input
                type="radio"
                name="tankColor"
                id={color}
                value={color}
                checked={selectedColor === color}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="peer hidden"
              />
              <label
                htmlFor={color}
                style={{ backgroundColor: color }}
                className="w-8 h-8 block cursor-pointer border-3 border-transparent 
                        peer-checked:border-white hover:border-white transition"
              ></label>
            </div>
          ))}
        </div>
        <div
          className={`${
            lobbyState && lobbyState.ownerId === socket.id ? "" : "hidden"
          }`}
        >
          <button className="text-white bg-green-700" onClick={startGame}>
            Start Game
          </button>
        </div>
      </div>
      {gameState.gameStarted && (
        <div>
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className={`bg-blue-100`}
          />
        </div>
      )}
    </main>
  );
}

export default Game;
