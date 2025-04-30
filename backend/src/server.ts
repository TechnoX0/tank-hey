// server.js
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
        const room = roomManager.joinRoom(roomId, socket.id);
        callback(room);
    });

    socket.on("playerAction", (roomId, playerId, action) => {
        roomManager.playerAction(roomId, playerId, action);
    });

    socket.on("disconnect", () => {
        console.log("A user has disconnected");
        roomManager.removePlayerFromRoom(playerId);
    });

    socket.on("getRoomInfo", (roomId, callback) => {
        const roomInfo = roomManager.getRoomInfo(roomId);
        callback(roomInfo);
    })
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
