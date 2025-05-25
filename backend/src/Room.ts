import GameManager from "./GameManager";
import Player from "./Utils/Player";

class Room {
    id: string;
    ownerId: string;
    name: string;
    // players: Record<string, Player> = {};
    gameManager: GameManager;
    lastActive: number; // Timestamp of last activity

    constructor(roomName: string, ownerId: string) {
        this.id = this.generateRoomId()
        this.ownerId = ownerId
        this.name = roomName
        this.gameManager = new GameManager()
        this.lastActive = Date.now()
    }

    addPlayer(playerId: string) {
        if (Object.keys(this.gameManager.players).includes(playerId)) return "Player already in room";
        const newPlayer = new Player(playerId, playerId === this.ownerId);

        this.gameManager.addPlayer(playerId, newPlayer);
        this.lastActive = Date.now(); // Update activity timestamp
        return this
    }

    removePlayer(playerId: string) {
        if (Object.keys(this.gameManager.players).includes(playerId)) return "Player is not in room";
        delete this.gameManager.players[playerId];
        this.gameManager.removePlayer(playerId);
        this.lastActive = Date.now(); // Update last activity
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

    getState() {
        return {
            id: this.id,
            ownerId: this.ownerId,
            name: this.name,
            players: this.gameManager.players,
        };
    }
}

export default Room;