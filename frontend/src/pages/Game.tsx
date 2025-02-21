import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import GameListener from "../GameListener";
import { setupControls } from "../Controls";
import { drawTank } from "../interface/Tank";
import { drawProjectile } from "../interface/Projectile";

const socket = io("http://localhost:4000");

interface GameState {
    id: string;
    players?: any;
    projectiles?: any;
}

function Game() {
    const params = useParams<{ roomId: string }>();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

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

        socket.on("gameState", (gameState: any) => {
            if (!params.roomId) return;
            drawGame(gameState);
        });

        gameListener.start();

        return () => {
            socket.off("gameState");
            gameListener.stop();
        };
    }, [params.roomId]);

    const drawGame = (gameState: GameState) => {
        if (!ctxRef.current) return;
        const ctx = ctxRef.current;
        ctx.clearRect(0, 0, 1280, 720);

        Object.keys(gameState.players).forEach((playerId) => {
            const player = gameState.players[playerId];
            if (!ctx) return;

            drawTank(player, ctx);
        });

        Object.keys(gameState.projectiles).forEach((projectileId) => {
            const projectile = gameState.projectiles[projectileId];
            if (!ctx) return;

            drawProjectile(projectile, ctx);
        });
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="bg-blue-100"
            />
        </div>
    );
}

export default Game;
