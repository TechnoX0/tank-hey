import GameManager from "./GameManager";
import PlayerAction from "./interface/PlayerAction";
import GameState from "./interface/GameState";
import Room from "./Room";

class RoomManager {
    public rooms: Record<string, Room>;;

    constructor() {
        this.rooms = {};
    }

    update(deltaTime: number) {
        Object.keys(this.rooms).forEach((roomId) => {
            this.rooms[roomId].gameManager.update(deltaTime);
        });
    }

    createRoom(roomName: string) {
        const newRoom = new Room(roomName);
        this.rooms[newRoom.id] = newRoom;
        return newRoom.id;
    }

    joinRoom(roomId: string, playerId: string) {
        const room = this.rooms[roomId];
        if (!room) return "Room does not exist!";
        if (room.players.includes(playerId)) return "Player already in room";

        room.players.push(playerId);
        room.gameManager.addPlayer(playerId);
        room.lastActive = Date.now(); // Update activity timestamp
        return room;
    }

    removePlayerFromRoom(playerId: string) {
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

    getRoomGameState(roomId: string) {
        return this.rooms[roomId]?.gameManager.getGameState() || {};
    }

    playerAction(roomId: string, playerId: string, action: PlayerAction) {
        const room = this.rooms[roomId];
        room.gameManager.playerAction(playerId, action);
    }

    getAllGameStates(): Record<string, GameState> {
        const gameStates: Record<string, GameState> = {};
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
