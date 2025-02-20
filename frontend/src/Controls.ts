import GameListener from "./GameListener";
import { Socket } from "socket.io-client";

export function setupControls(gameListener: GameListener, socket: Socket, roomId: string | undefined, playerId: string | undefined) {
    if (!roomId || !playerId) return;

    gameListener.addAction("ArrowUp", () => {
        socket.emit("playerAction", roomId, playerId, {
            type: "move",
            data: true,
        });
    });

    gameListener.addAction("ArrowDown", () => {
        socket.emit("playerAction", roomId, playerId, {
            type: "move",
            data: false,
        });
    });

    gameListener.addAction("ArrowLeft", () => {
        socket.emit("playerAction", roomId, playerId, {
            type: "rotate",
            data: -4,
        });
    });

    gameListener.addAction("ArrowRight", () => {
        socket.emit("playerAction", roomId, playerId, {
            type: "rotate",
            data: 4,
        });
    });
}
