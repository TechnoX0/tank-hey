// server.js
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import RoomManager from "./classes/RoomManager.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
    },
});

const roomManager = new RoomManager();

io.on("connection", (socket) => {
    console.log("A user has connected");
    const playerId = socket.id;

    socket.on("createRoom", (roomName, callback) => {
        const roomId = roomManager.createRoom(roomName);
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
});

setInterval(() => {
    Object.keys(roomManager.rooms).forEach((roomId) => {
        io.to(roomId).emit("gameState", roomManager.getRoomGameState(roomId));
    });
}, 1000 / 30);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log("server running at http://localhost:" + PORT);
});
