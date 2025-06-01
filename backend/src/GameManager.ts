// GameManager.js
import Tank from "./GameObjects/Tanks/Tank";
import Projectile from "./GameObjects/Projectiles/Projectile";
import Maps from "./Maps/Maps";
import PlayerAction from "./interface/PlayerAction";
import Message from "./interface/Message";
import Player from "./Utils/Player";
import { MapData } from "./interface/Map";
import GameState from "./interface/GameState";
import UniformGridManager from "./UniformGridManager";
import PowerUpManager from "./GameObjects/PowerUps/PowerUpManager";

class GameManager {
    public players: Record<string, Player>;
    private projectiles: Projectile[];
    private map: MapData;
    public gameStarted: boolean = false; // Flag to indicate if the game has started
    private messages: Message[] = []; // Array to store messages
    private grid: UniformGridManager = new UniformGridManager(100);
    public powerUpManager: PowerUpManager = new PowerUpManager();

    constructor() {
        this.players = {};
        this.projectiles = [];
        this.map = this.pickRandomMap();

        for (const wall of this.map.walls) {
            this.grid.addWall(wall);
        }
    }

    update(deltaTime: number) {
        if (!this.gameStarted) return; // Only update if the game has started

        this.powerUpManager.update(deltaTime);
        this.grid.clear();

        for (const projectile of this.projectiles) {
            this.grid.addEntity(projectile);
        }

        for (const player of Object.values(this.players)) {
            this.grid.addEntity(player.tank);
        }

        for (const powerUp of Object.values(this.powerUpManager.powerUps)) {
            this.grid.addEntity(powerUp);
        }

        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update(deltaTime, this.grid);

            // Remove projectile if it should be destroyed
            if (projectile.shouldDestroy()) {
                this.projectiles.splice(i, 1);
            }
        }

        this.removeDeadEntities();
    }

    removeDeadEntities() {
        for (const key in this.projectiles) {
            const projectile = this.projectiles[key];

            if (projectile.isDead) {
                this.projectiles.splice(parseInt(key), 1);
            }
        }
    }

    startGame() {
        this.gameStarted = true;
        return this.getGameState();
    }

    pickRandomMap() {
        return Maps[Math.floor(Math.random() * Maps.length)];
    }

    addPlayer(socketId: string, player: Player) {
        this.players[socketId] = player;
    }

    playerAction(playerId: string, action: PlayerAction) {
        if (!this.gameStarted) return; // Only process actions if the game has started
        const player: Tank = this.players[playerId].tank;
        if (!player) return;

        switch (action.type) {
            case "rotate":
                player.rotate(action.data, this.map);
                break;
            case "move":
                player.move(this.map, action.data);
                break;
            case "shoot":
                const projectile = player.shoot();
                if (projectile) this.projectiles.push(projectile);
            default:
                break;
        }
    }

    removePlayer(socketId: string) {
        delete this.players[socketId];
    }

    setMessages(type: string, data: any) {
        this.messages.push({ type, data });
    }

    getGameState(): GameState {
        return {
            map: this.map,
            players: this.players,
            projectiles: this.projectiles,
            powerUps: this.powerUpManager.powerUps,
            gameStarted: this.gameStarted,
            messages: this.messages,
        };
    }
}

export default GameManager;
