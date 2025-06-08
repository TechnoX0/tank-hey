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
        </div>
    );
};

export default Selection;
