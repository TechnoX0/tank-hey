import PlayerAction from "./interface/PlayerAction";
import GameState from "./interface/GameState";
import Room from "./Room";

class RoomManager {
    public rooms: Record<string, Room>;

    constructor() {
        this.rooms = {};
    }

    update(deltaTime: number) {
        Object.keys(this.rooms).forEach((roomId) => {
            this.rooms[roomId].gameManager.update(deltaTime);
        });
    }

    createRoom(roomName: string, ownerId: string) {
        const newRoom = new Room(roomName, ownerId);
        this.rooms[newRoom.id] = newRoom;
        return newRoom.id;
    }

    joinRoom(roomId: string, playerId: string) {
        const room = this.rooms[roomId];
        if (!room) return "Room does not exist!";
        return room.addPlayer(playerId);
    }

    removePlayer(playerId: string) {
        for (const roomId in this.rooms) {
            const room = this.rooms[roomId];
            room.removePlayer(playerId);
        }
    }

    cleanupRooms() {
        const now = Date.now();
        Object.keys(this.rooms).forEach((roomId) => {
            const room = this.rooms[roomId];
            if (Object.keys(room.gameManager.players).length == 0 && now - room.lastActive > 30000) {
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
}

export default RoomManager;
