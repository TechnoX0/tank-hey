import { useState } from "react";
import { getSocket } from "../Socket";

const socket = getSocket();
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

type LobbyProps = {
  roomId: string;
  onStartGame: () => void;
  isOwner: boolean;
};

const Lobby = ({ roomId, onStartGame, isOwner }: LobbyProps) => {
  const [selectedClass, setClass] = useState(classes[0]);
  const [selectedColor, setColor] = useState(colors[0]);
  const [isReady, setReady] = useState(false);

  const emitLobbyUpdate = (data: {
    selectedClass: string;
    selectedColor: string;
    isReady: boolean;
  }) => {
    socket.emit(
      "updateLobby",
      roomId,
      { playerId: socket.id, ...data },
      (response: any) => {
        if (!response?.success) {
          console.error("Failed to update lobby:", response?.message);
        }
      }
    );
  };

  const handleClassChange = (newClass: string) => {
    setClass(newClass);
    emitLobbyUpdate({ selectedClass: newClass, selectedColor, isReady });
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    emitLobbyUpdate({ selectedClass, selectedColor: newColor, isReady });
  };

  const handleReadyChange = (newReady: boolean) => {
    setReady(newReady);
    emitLobbyUpdate({ selectedClass, selectedColor, isReady: newReady });
  };

  return (
    <div className="bg-[#EDEDED]">
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

      {isOwner ? (
        <div>
          <button className="text-white bg-green-700" onClick={onStartGame}>
            Start Game
          </button>
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
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
  );
};

export default Lobby;
