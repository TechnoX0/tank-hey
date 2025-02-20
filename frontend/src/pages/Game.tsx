import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import GameListener from "../GameListener";

const socket = io("http://localhost:3000");

interface Player {
    x: number;
    y: number;
}

interface GameState {
    id: string;
    players?: any;
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

        gameListener.addAction("ArrowUp", (isPressed) => {
            socket.emit("playerAction", params.roomId, socket.id, {
                type: "move",
                data: true,
            });
        });

        gameListener.addAction("ArrowDown", (isPressed) => {
            socket.emit("playerAction", params.roomId, socket.id, {
                type: "move",
                data: false,
            });
        });

        gameListener.addAction("ArrowLeft", (isPressed) => {
            socket.emit("playerAction", params.roomId, socket.id, {
                type: "rotate",
                data: -4,
            });
        });

        gameListener.addAction("ArrowRight", (isPressed) => {
            socket.emit("playerAction", params.roomId, socket.id, {
                type: "rotate",
                data: 4,
            });
        });

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

        Object.keys(gameState.players).forEach((playerId) => {
            const player = gameState.players[playerId];
            const ctx = ctxRef.current;
            if (!ctx) return;

            ctx.clearRect(0, 0, 1280, 720);
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.moveTo(
                player.x + player.hitbox.vertices[0].x,
                player.y + player.hitbox.vertices[0].y
            );
            player.hitbox.vertices.forEach((point: any) => {
                ctx.lineTo(player.x + point.x, player.y + point.y);
            });
            ctx.closePath();
            ctx.fill();
        });
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="bg-blue-50"
            />
        </div>
    );
}

export default Game;
