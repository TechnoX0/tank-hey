import GameManager from "./GameManager";

class Room {
    id: string;
    name: string;
    players: string[] = [];
    gameManager: GameManager;
    lastActive: number; // Timestamp of last activity

    constructor(roomName: string) {
        this.id = this.generateRoomId()
        this.name = roomName
        this.gameManager = new GameManager()
        this.lastActive = Date.now()
    }

    addPlayer(playerId: string) {
        if (this.players.includes(playerId)) return "Player already in room";
        this.players.push(playerId);
        this.gameManager.addPlayer(playerId);
        this.lastActive = Date.now(); // Update activity timestamp
        return this
    }

    removePlayer(playerId: string) {
        if (!this.players.includes(playerId)) return "Player is not in room";
        this.players = this.players.filter((id) => id !== playerId);
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
}

export default Room;