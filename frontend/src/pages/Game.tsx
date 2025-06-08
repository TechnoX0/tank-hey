import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GameState from "../interface/GameState";
import useGameRenderer from "../hooks/useGameRenderer";
import { useGameSocket } from "../hooks/useGameSocket";
import { getSocket } from "../Socket";
import Selection from "../components/Selection";
import { GameStatus } from "../components/GameStatus";
import { SoundManager } from "../utils/SoundManager";

const socket = getSocket();
const canvasWidth = 1000;
const canvasHeight = 600;

const SoundEffects = [
    {
        trigger: "death",
        soundPath: "Tank SFX/effect_death.ogg",
        samePlayer: true,
    },
    {
        trigger: "takeDamage",
        soundPath: "Tank SFX/effect_dmg.wav",
        samePlayer: true,
    },
    {
        trigger: "pickUpPowerUp",
        soundPath: "Tank SFX/effect_item_pickup.wav",
        samePlayer: true,
    },
    {
        trigger: "killedPlayer",
        soundPath: "Tank SFX/effect_kill.wav",
        samePlayer: false,
    },
    {
        trigger: "respawn",
        soundPath: "Tank SFX/effect_respawn.ogg",
        samePlayer: true,
    },
    {
        trigger: "useSkill",
        soundPath: "Tank SFX/effect_skill_use.wav",
        samePlayer: true,
    },
    // { trigger: "move", soundPath: "Tank SFX/tank_movement.ogg" },
];

function Game() {
    const params = useParams<{ roomId: string }>();
    const roomId = params.roomId || "";
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const navigate = useNavigate();

    const [gameState, setGameState] = useState<GameState>({
        id: "",
        map: {},
        players: {},
        projectiles: {},
        gameStarted: false,
        gameEnded: false,
    });
    const [lobbyState, setLobbyState] = useState<any>();

    useEffect(() => {
        socket.emit("getRoomState", roomId, (state: any) => {
            setLobbyState(state);
        });

        socket.on("updateLobby", (state: any) => {
            setLobbyState(state);
        });

        // socket.on("move", (data) => {
        //     console.log("Data:", data);
        //     if (socket.id === data.id) {
        //         if (data.moving) {
        //             SoundManager.loop(
        //                 `/assets/Sound/Sound Effects/Tank SFX/tank_movement.ogg`
        //             );
        //         } else {
        //             SoundManager.stopLoop(
        //                 `/assets/Sound/Sound Effects/Tank SFX/tank_movement.ogg`
        //             );
        //         }
        //     }
        // });

        for (const soundEffect of SoundEffects) {
            socket.on(soundEffect.trigger, (data: any) => {
                if (socket.id === data.id) {
                    if (soundEffect.samePlayer && data.id != socket.id) return;
                    SoundManager.play(
                        `/assets/Sound/Sound Effects/${soundEffect.soundPath}`
                    );
                }
            });
        }

        return () => {
            socket.off("updateLobby");
            for (const soundEffect of SoundEffects) {
                socket.off(soundEffect.trigger);
            }
        };
    }, [roomId]);

    useEffect(() => {
        if (!canvasRef.current) return;
        ctxRef.current = canvasRef.current.getContext("2d");
    }, [gameState.gameStarted]);

    useEffect(() => {
        if (gameState.gameEnded && gameState.gameStarted) {
            setTimeout(() => navigate("/"), 5000);
        }
    }, [gameState.gameEnded]);

    function startGame() {
        socket.emit(
            "startGame",
            roomId,
            (success: boolean, message: string, gameState: GameState) => {
                console.log(success, message);
                console.log(gameState);
            }
        );

        SoundManager.play("/assets/Sound/Sound Effects/UI SFX/match_start.wav");
    }

    useGameSocket(socket, roomId, setGameState);
    useGameRenderer(canvasRef.current, ctxRef.current, gameState, socket);
    // console.log(lobbyState, socket.id);

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
                <div className="relative flex">
                    {gameState.gameEnded && gameState.winner && (
                        <div className="absolute grid place-items-center w-full h-full">
                            <img src="/assets/GUI/win_frame.png" alt="Win" />
                            <img
                                className="absolute z-10 w-20 h-20 top-[40%]"
                                src={`/assets/TankSprites/Tank ${gameState.winner.color}.png`}
                                alt=""
                            />
                        </div>
                    )}
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
