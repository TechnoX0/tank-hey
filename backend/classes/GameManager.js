// GameManager.js
import Tank from "./Tank.js";
import Projectile from "./Projectile/Projectile.js";

class GameManager {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.players = {};
        this.projectiles = [];
    }

    update(deltaTime) {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];

            projectile.move(deltaTime);
        }
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
            case "shoot":
                this.projectiles.push(
                    new Projectile(
                        playerId,
                        player.x,
                        player.y,
                        player.rotation,
                        10
                    )
                );
            default:
                break;
        }
    }

    removePlayer(socketId) {
        delete this.players[socketId];
    }

    getGameState() {
        return { players: this.players, projectiles: this.projectiles };
    }
}

export default GameManager;
