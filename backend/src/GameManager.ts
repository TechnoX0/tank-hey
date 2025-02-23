// GameManager.js
import Tank from "./Tank";
import Projectile from "./Projectile/Projectile";
import { Maps } from "./Maps/Map";
import PlayerAction from "./interface/PlayerAction";
import Bullet from "./Projectile/Bullet";

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

            projectile.move(this.canvasWidth, this.canvasHeight, deltaTime);
        }
    }

    addPlayer(socketId: string) {
        this.players[socketId] = new Tank(100, 100, 6);
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
                this.projectiles.push(
                    new Bullet(
                        playerId,
                        player.x,
                        player.y,
                        player.rotation,
                    )
                );
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
