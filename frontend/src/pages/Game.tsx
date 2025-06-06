import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import GameState from "../interface/GameState";
import useGameRenderer from "../hooks/useGameRenderer";
import { useGameSocket } from "../hooks/useGameSocket";
import { getSocket } from "../Socket";
import Selection from "../components/Selection";
import { GameStatus } from "../components/GameStatus";

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
    const [lobbyState, setLobbyState] = useState<any>();

    useEffect(() => {
        socket.emit("getRoomState", roomId, (state: any) => {
            setLobbyState(state);
        });

        socket.on("updateLobby", (state: any) => {
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
                console.log(success, message);
                console.log(gameState);
            }
        );
    }

    useGameSocket(socket, roomId, setGameState);
    useGameRenderer(canvasRef.current, ctxRef.current, gameState, socket);

    return (
        <main className="grid place-items-center h-screen w-screen box-border">
            {!gameState.gameStarted && (
                <Selection
                    roomId={roomId}
                    onStartGame={startGame}
                    isOwner={lobbyState?.ownerId === socket.id}
                />
            )}
            {gameState.gameStarted && (
                <div className="flex">
                    <canvas
                        ref={canvasRef}
                        width={canvasWidth}
                        height={canvasHeight}
                        className="bg-blue-100"
                    />
                    <GameStatus gameState={gameState} />
                </div>
            )}
        </main>
    );
}

export default Game;
