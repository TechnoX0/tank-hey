import GameListener from "./GameListener";
import { Socket } from "socket.io-client";

export function setupControls(
    gameListener: GameListener,
    socket: Socket,
    roomId: string | undefined,
    playerId: string | undefined
) {
    if (!roomId || !playerId) return;

    gameListener.addAction("KeyW", {
        onHold: () => {
            socket.emit("playerAction", roomId, playerId, {
                type: "move",
                data: true,
            });
        },
    });

    gameListener.addAction("KeyS", {
        onHold: () => {
            socket.emit("playerAction", roomId, playerId, {
                type: "move",
                data: false,
            });
        },
    });

    gameListener.addAction("KeyA", {
        onHold: () => {
            socket.emit("playerAction", roomId, playerId, {
                type: "rotate",
                data: true,
            });
        },
    });

    gameListener.addAction("KeyD", {
        onHold: () => {
            socket.emit("playerAction", roomId, playerId, {
                type: "rotate",
                data: false,
            });
        },
    });

    gameListener.addAction("KeyJ", {
        onPress: () => {
            socket.emit("playerAction", roomId, playerId, {
                type: "shoot",
            });
        },
    });
}
