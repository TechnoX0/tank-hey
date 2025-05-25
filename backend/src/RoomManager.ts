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

    startGame(roomId: string, callback?: (result: { success: boolean; message: string; gameState: GameState }) => { success: boolean, message: string, gameState: GameState }) {
        const room = this.rooms[roomId];
        const manager = room.gameManager
        let gameState = manager.getGameState();

        if (!room) {
            const result = { success: false, message: "Room not found", gameState };
            callback?.(result);
            return result;
        }

        const players = Object.values(room.gameManager.players);

        // Ensure all NON-host players are ready
        const allNonHostReady = players
            .filter((p) => !p.isHost)
            .every((p) => p.isReady);

        if (!allNonHostReady) {
            const result = { success: false, message: "Not all players are ready.", gameState };
            callback?.(result);
            return result;
        }

        gameState = manager.startGame();

        callback?.({ success: true, message: "Game Start", gameState });

        return { success: true, message: "Game Start", gameState };
    }

    allInRoomReady(roomId: string): boolean {
        const room = this.rooms[roomId];
        const manager = room.gameManager
        const players = Object.values(manager.players);

        const allNonHostReady = players
            .filter((p) => !p.isHost)
            .every((p) => p.isReady);

        return allNonHostReady;
    }
}

export default RoomManager;
