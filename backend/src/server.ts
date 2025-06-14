import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import RoomManager from "./RoomManager";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const roomManager = new RoomManager();
let lastUpdateTime = Date.now();

io.on("connection", (socket) => {
    console.log("A user has connected");
    const playerId = socket.id;

    socket.on("createRoom", (roomName, callback) => {
        const roomId = roomManager.createRoom(roomName, playerId);
        callback(roomId);
    });

    socket.on("joinRoom", (roomId, callback) => {
        socket.join(roomId);
        roomManager.joinRoom(roomId, playerId);
        const roomState = roomManager.getRoomGameState(roomId);
        callback(roomState);
    });

    socket.on("playerAction", (roomId, playerId, action) => {
        roomManager.playerAction(roomId, playerId, action);
    });

    socket.on("startGame", (roomId, callback) => {
        const result = roomManager.startGame(roomId, callback);

        console.log("Result:", result);

        if (result.success) io.to(roomId).emit("gameState", result);
    });

    socket.on("updateLobby", (roomId, data) => {
        const room = roomManager.rooms[roomId];
        if (!room) return;

        const player = room.gameManager.players[data.playerId];
        if (!player) return;

        if (typeof data.selectedClass === "string") {
            player.setTankClass(data.selectedClass);
        }

        if (typeof data.selectedColor === "string") {
            player.setColor(data.selectedColor);
        }

        if (typeof data.isReady === "boolean") {
            player.setIsReady(data.isReady);
        }

        console.log(room.getState());
        if (!room.getState()) return;

        io.to(roomId).emit("updateLobby", room.getState());

        socket.to(roomId).emit("updateLobby", room.getState());
    });

    socket.on("getRoomState", (roomId, callback) => {
        const room = roomManager.rooms[roomId];
        if (!room) return;
        callback(room.getState());
    });

    socket.on("disconnect", () => {
        console.log("A user has disconnected");
        roomManager.removePlayer(playerId);
    });
});

setInterval(() => {
    const now = Date.now();
    const deltaTime = (now - lastUpdateTime) / 16.67; // Scale updates to ~60 FPS
    lastUpdateTime = now;

    roomManager.update(deltaTime);

    Object.keys(roomManager.rooms).forEach((roomId) => {
        io.to(roomId).emit("gameState", roomManager.getRoomGameState(roomId));
    });
}, 1000 / 60);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log("server running at http://localhost:" + PORT);
});

export { io };
