import { useEffect, useState } from "react";
import { getSocket } from "../Socket";
import TankSelection from "../pages/TankSelection";
import Lobby from "../pages/Lobby";

const socket = getSocket();
const classes = ["juggernaut", "sniper", "scout", "allrounder"];
const colors = [
    "1f77b4",
    "ff7f0e",
    "2ca02c",
    "d62728",
    "9467bd",
    "8c564b",
    "e377c2",
    "7f7f7f",
    "bcbd22",
    "17becf",
];

type Props = {
    roomId: string;
    onStartGame: () => void;
    isOwner: boolean;
};

const Selection = ({ roomId, onStartGame, isOwner }: Props) => {
    const [lobbyState, setLobbyState] = useState<any>();
    const [selectedClass, setClass] = useState(classes[0]);
    const [selectedColor, setColor] = useState(colors[0]);
    const [isReady, setReady] = useState(false);
    const [isClassSelected, setIsClassSelected] = useState<boolean>(false);

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

    const handleReadyChange = () => {
        setReady(!isReady);
        emitLobbyUpdate({ selectedClass, selectedColor, isReady: !isReady });
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

    return (
        <div className="relative w-screen h-screen">
            {!isClassSelected ? (
                <TankSelection
                    selectedClass={selectedClass}
                    handleChange={handleClassChange}
                    handleLock={setIsClassSelected}
                />
            ) : (
                <Lobby
                    handleColorChange={handleColorChange}
                    handleReadyChange={handleReadyChange}
                    onStartGame={onStartGame}
                    lobbyState={lobbyState}
                    playerId={socket.id || ""}
                    isOwner={isOwner}
                />
            )}
            {/* <div className="flex gap-12">
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
                                onChange={(e) =>
                                    handleClassChange(e.target.value)
                                }
                            />
                            <label htmlFor={className}>
                                {className.charAt(0).toUpperCase() +
                                    className.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>

                <div>
                    <h1>Colors</h1>
                    <div className="flex">
                        {colors.map((color) => (
                            <div key={color}>
                                <input
                                    type="radio"
                                    name="tankColor"
                                    id={color}
                                    value={color}
                                    checked={selectedColor === color}
                                    onChange={(e) =>
                                        handleColorChange(e.target.value)
                                    }
                                    className="peer hidden"
                                />
                                <label
                                    htmlFor={color}
                                    style={{ backgroundColor: `#${color}` }}
                                    className="w-8 h-8 block cursor-pointer border-3 border-transparent peer-checked:border-white hover:border-white transition"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {isOwner ? (
                    <div>
                        <button
                            className="text-white bg-green-700"
                            onClick={onStartGame}
                        >
                            Start Game
                        </button>
                    </div>
                ) : (
                    <div>
                        <input
                            type="checkbox"
                            id="ready-toggle"
                            checked={isReady}
                            onChange={(e) =>
                                handleReadyChange(e.target.checked)
                            }
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
            <div>
                    {lobbyState && lobbyState.players && (
                        <LobbyStatus lobbyState={lobbyState} />
                    )}
                </div> */}
        </div>
    );
};

export default Selection;
