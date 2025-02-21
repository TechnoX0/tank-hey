// RoomManager.js
import GameManager from "./GameManager.js";

class RoomManager {
    constructor() {
        this.rooms = {};
    }

    update(deltaTime) {
        Object.keys(this.rooms).forEach((roomId) => {
            this.rooms[roomId].gameManager.update(deltaTime);
        });
    }

    createRoom(roomName) {
        const roomId = this.generateRoomId();
        this.rooms[roomId] = {
            id: roomId,
            roomName: roomName,
            players: [],
            gameManager: new GameManager(800, 600),
            lastActive: Date.now(), // Track last activity
        };
        return roomId;
    }

    joinRoom(roomId, playerId) {
        if (!this.rooms[roomId]) return "Room does not exist!";
        if (this.rooms[roomId].players.includes(playerId))
            return "Player already in room";

        this.rooms[roomId].players.push(playerId);
        this.rooms[roomId].gameManager.addPlayer(playerId);
        this.rooms[roomId].lastActive = Date.now(); // Update activity timestamp
        return this.rooms[roomId];
    }

    removePlayerFromRoom(playerId) {
        for (const roomId in this.rooms) {
            const room = this.rooms[roomId];
            if (room.players.includes(playerId)) {
                room.players = room.players.filter((id) => id !== playerId);
                room.gameManager.removePlayer(playerId);
                room.lastActive = Date.now(); // Update last activity
            }
        }
    }

    cleanupRooms() {
        const now = Date.now();
        Object.keys(this.rooms).forEach((roomId) => {
            const room = this.rooms[roomId];
            if (room.players.length === 0 && now - room.lastActive > 30000) {
                // Remove rooms inactive for 30+ seconds
                console.log(`Removing empty room: ${roomId}`);
                delete this.rooms[roomId];
            }
        });
    }

    getRoomGameState(roomId) {
        return this.rooms[roomId]?.gameManager.getGameState() || {};
    }

    playerAction(roomId, playerId, action) {
        const room = this.rooms[roomId];
        room.gameManager.playerAction(playerId, action);
    }

    getAllGameStates() {
        const gameStates = {};
        for (const roomId in this.rooms) {
            gameStates[roomId] = this.rooms[roomId].gameManager.getGameState();
        }
        return gameStates;
    }

    generateRoomId(length = 8) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let roomId = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            roomId += characters[randomIndex];
        }
        return roomId;
    }
}

export default RoomManager;
