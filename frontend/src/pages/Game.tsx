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
  const [isReady, setIsReady] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    id: "",
    map: {},
    players: {},
    projectiles: {},
    gameStarted: false,
  });
  const [lobbyState, setLobbyState] = useState<any>();

  // Handle changes immediately and emit
  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
    emitLobbyUpdate({ selectedClass: newClass, selectedColor, isReady });
  };

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    emitLobbyUpdate({ selectedClass, selectedColor: newColor, isReady });
  };

  const handleReadyChange = (newReady: boolean) => {
    setIsReady(newReady);
    emitLobbyUpdate({ selectedClass, selectedColor, isReady: newReady });
  };

  const emitLobbyUpdate = (data: {
    selectedClass: string;
    selectedColor: string;
    isReady: boolean;
  }) => {
    socket.emit(
      "updateLobby",
      roomId,
      {
        playerId: socket.id,
        ...data,
      },
      (response: any) => {
        if (!response?.success) {
          console.error("Failed to update lobby:", response?.message);
        }
      }
    );
  };

  useEffect(() => {
    socket.emit("getRoomState", roomId, (state: any) => {
      console.log("Lobby state:", state);
      setLobbyState(state);
    });

    socket.on("updateLobby", (state: any) => {
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

  function startGame() {
    socket.emit(
      "startGame",
      roomId,
      (success: boolean, message: string, gameState: GameState) => {
        // console.log(success, message, gameState);
        console.log(success, message);
        console.log(gameState);
        // setGameState(gameState);
      }
    );
  }

  useGameSocket(socket, roomId, setGameState);
  useGameRenderer(canvasRef.current, ctxRef.current, gameState, socket);

  return (
    <main className="grid place-items-center h-screen w-screen bg-white box-border">
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
                onChange={(e) => handleClassChange(e.target.value)}
              />
              <label htmlFor={className}>
                {className.charAt(0).toUpperCase() + className.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <div>
          <h1>Colors</h1>
          {colors.map((color) => (
            <div key={color}>
              <input
                type="radio"
                name="tankColor"
                id={color}
                value={color}
                checked={selectedColor === color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="peer hidden"
              />
              <label
                htmlFor={color}
                style={{ backgroundColor: color }}
                className="w-8 h-8 block cursor-pointer border-3 border-transparent 
                        peer-checked:border-white hover:border-white transition"
              />
            </div>
          ))}
        </div>

        {lobbyState?.ownerId === socket.id ? (
          <div>
            <button className="text-white bg-green-700" onClick={startGame}>
              Start Game
            </button>
          </div>
        ) : (
          <div>
            <input
              type="checkbox"
              name="tankColor"
              id="ready-toggle"
              checked={isReady}
              onChange={(e) => handleReadyChange(e.target.checked)}
              className="peer hidden"
            />
            <label
              htmlFor="ready-toggle"
              className="h-8 cursor-pointer border-3 border-transparent bg-green-800 text-white peer-checked:border-white hover:border-white transition"
            >
              {isReady ? "Ready" : "Not Ready"}
            </label>
          </div>
        )}
      </div>

      {gameState.gameStarted && (
        <div>
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="bg-blue-100"
          />
        </div>
      )}
    </main>
  );
}

export default Game;
