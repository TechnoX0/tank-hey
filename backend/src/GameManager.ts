// GameManager.js
import Tank from "./Tank";
import Projectile from "./Projectile/Projectile";
import { Maps } from "./Maps/Map";
import PlayerAction from "./interface/PlayerAction";
import Vector2D from "./Vector2D";

class GameManager {
    private canvasWidth: number;
    private canvasHeight: number;
    private players: Record<string, Tank>;
    private projectiles: Projectile[];
    private map: any;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.players = {};
        this.projectiles = [];
        this.map = this.pickRandomMap();
    }

    pickRandomMap() {
        return Maps[Math.floor(Math.random() * Maps.length)];
    }

    update(deltaTime: number) {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.move(this.canvasWidth, this.canvasHeight, deltaTime, this.map.walls);
            
            // Remove projectile if it should be destroyed
            if (projectile.shouldDestroy()) {
                this.projectiles.splice(i, 1);
            }
        }
    }

    addPlayer(socketId: string) {
        this.players[socketId] = new Tank(new Vector2D(100, 100));
    }

    playerAction(playerId: string, action: PlayerAction) {
        const player = this.players[playerId];
        if (!player) return;

        switch (action.type) {
            case "rotate":
                player.rotate(action.data);
                break;
            case "move":
                player.move(this.canvasWidth, this.canvasHeight, action.data);
                break;
            case "shoot":
                this.projectiles.push();
            default:
                break;
        }
    }

    removePlayer(socketId: string) {
        delete this.players[socketId];
    }

    getGameState() {
        return { map: this.map, players: this.players, projectiles: this.projectiles };
    }
}

export default GameManager;
