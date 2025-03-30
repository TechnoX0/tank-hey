// GameManager.js
import Tank from "./Tanks/Tank";
import Projectile from "./Projectiles/Projectile";
import Maps from "./Maps/Maps";
import PlayerAction from "./interface/PlayerAction";
import Vector2D from "./Utils/Vector2D";
import MapData from "./interface/MapData";

class GameManager {
    private canvasWidth: number;
    private canvasHeight: number;
    private players: Record<string, Tank>;
    private projectiles: Projectile[];
    private map: MapData;

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
        this.players[socketId] = new Tank(new Vector2D(40, 40));
    }

    playerAction(playerId: string, action: PlayerAction) {
        const player: Tank = this.players[playerId];
        if (!player) return;

        switch (action.type) {
            case "rotate":
                player.rotate(action.data, this.map);
                break;
            case "move":
                player.move(this.map, action.data);
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
