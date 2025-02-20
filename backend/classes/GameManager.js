// GameManager.js
import Tank from "./Tank.js";

class GameManager {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.players = {};
    }

    addPlayer(socketId) {
        this.players[socketId] = new Tank(100, 100, 6);
    }

    playerAction(playerId, action) {
        const player = this.players[playerId];
        if (!player) return;

        switch (action.type) {
            case "rotate":
                player.rotate(action.data);
                break;
            case "move":
                player.move(action.data);
                break;
            default:
                break;
        }
    }

    removePlayer(socketId) {
        delete this.players[socketId];
    }

    getGameState() {
        return { players: this.players };
    }
}

export default GameManager;
