import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (scoket) => {
    console.log("A user has connected");

    io.on("disconnect", () => {
        console.log("A user has disconnected");
    });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
