// RoomManager.js
import GameManager from "./GameManager.js";

class RoomManager {
    constructor() {
        this.rooms = {};
    }

    createRoom(roomName) {
        const roomId = this.generateRoomId();
        const newRoom = {
            id: roomId,
            roomName: roomName,
            players: [],
            gameManager: new GameManager(800, 600),
        };
        this.rooms[roomId] = newRoom;
        return roomId;
    }

    joinRoom(roomId, playerId) {
        if (!this.rooms[roomId]) return "Room does not exist!";
        if (this.rooms[roomId].players.includes(playerId))
            return "Player already in room";

        this.rooms[roomId].players.push(playerId);
        this.rooms[roomId].gameManager.addPlayer(playerId);
        return this.rooms[roomId];
    }

    removePlayerFromRoom(playerId) {
        for (const roomId in this.rooms) {
            const room = this.rooms[roomId];
            if (room.players.includes(playerId)) {
                room.players = room.players.filter((id) => id !== playerId);
                room.gameManager.removePlayer(playerId);
            }
        }
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
