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
import PowerUpManager from "./PowerUpManager";
import { CollisionType, EntityType } from "./Utils/Enums";
import Vector2D from "./Utils/Vector2D";
import Wall from "./Maps/Wall";
import Collision from "./Utils/Collision";

class GameManager {
    public players: Record<string, Player>;
    private projectiles: Projectile[];
    private map: MapData;
    public gameStarted: boolean = false; // Flag to indicate if the game has started
    public gameEnded: boolean = false;
    public winner: Player | null = null;
    private messages: Message[] = []; // Array to store messages
    private grid: UniformGridManager = new UniformGridManager(100);
    public powerUpManager: PowerUpManager;

    private playerRespawnTime = 5000;

    constructor() {
        this.players = {};
        this.projectiles = [];
        this.map = this.pickRandomMap();
        this.powerUpManager = new PowerUpManager(this.map.walls, this.grid);

        for (const wall of this.map.walls) {
            this.grid.addWall(wall);
        }
    }

    update(deltaTime: number) {
        if (!this.gameStarted || this.gameEnded) return; // Only update if the game has started

        this.grid.clear();

        for (const projectile of this.projectiles) {
            this.grid.addEntity(projectile);
        }

        for (const player of Object.values(this.players)) {
            this.grid.addEntity(player.tank);
            player.tank.update(deltaTime);
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

        for (const player of Object.values(this.players)) {
            const tank = player.tank;
            const nearbyPowerUps = this.grid.getNearbyEntities(
                tank,
                EntityType.powerup
            );

            for (const powerUp of nearbyPowerUps) {
                if (tank.hitbox.collidesWith(powerUp.hitbox)) {
                    tank.applyPowerUp(powerUp);
                    powerUp.isActive = true;
                    powerUp.isPickedUp = true;
                    continue;
                }
            }

            if (tank.isDead && tank.lives > 0) {
                const passedTime = Date.now() - tank.lastRespawnTime;

                if (passedTime > this.playerRespawnTime) {
                    this.spawnPlayers(
                        this.players,
                        player,
                        this.map.walls,
                        150,
                        100
                    );
                }
            }
        }

        this.powerUpManager.update(deltaTime);
        this.checkGameOver();
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

    spawnPlayers(
        players: Record<string, Player>,
        spawnedPlayer: Player,
        walls: Wall[],
        minDistance: number,
        attempts: number
    ) {
        for (let i = 0; i < attempts; i++) {
            const tank = spawnedPlayer.tank;
            const testPosition = new Vector2D(
                Math.floor(Math.random() * 1000),
                Math.floor(Math.random() * 600)
            );

            const isFarEnough = Object.values(players).every(
                (player) =>
                    testPosition.distanceTo(player.tank.position) >= minDistance
            );

            // Temporarily update hitbox to test this position
            const testHitbox = new Collision(
                CollisionType.polygon,
                testPosition,
                tank.hitbox.vertices.map((vertex) => vertex.add(testPosition))
            );

            const hitsWall = walls.some((wall) =>
                testHitbox.collidesWith(wall.collision)
            );

            if (isFarEnough && !hitsWall) {
                tank.hitbox.position = testPosition;
                tank.position = testPosition;
                tank.lastRespawnTime = Date.now();
                tank.resetStats();
                console.log("✅ Spawned at", testPosition);
                return;
            }
        }
    }

    checkGameOver() {
        const livingPlayers = Object.values(this.players).filter(
            (player: Player) => player.tank.health > 0 || player.tank.lives > 0
        );

        this.gameEnded = livingPlayers.length <= 1;
        this.winner = livingPlayers[0];
    }

    startGame() {
        this.gameStarted = true;
        for (const id in this.players) {
            const player = this.players[id];
            const rotation = Math.floor(Math.random() * 360);
            player.tank.rotation = rotation;
            player.tank.rotate(true, this.map);
            this.spawnPlayers(this.players, player, this.map.walls, 150, 100);
        }
        return this.getGameState();
    }

    pickRandomMap() {
        return Maps[Math.floor(Math.random() * Maps.length)];
    }

    addPlayer(socketId: string, player: Player) {
        this.players[socketId] = player;
    }

    playerAction(playerId: string, action: PlayerAction) {
        if (!this.gameStarted || this.gameEnded) return; // Only process actions if the game has started
        const player: Tank = this.players[playerId].tank;
        if (!player) return;

        let moved = false;

        switch (action.type) {
            case "rotate":
                player.rotate(action.data, this.map);
                break;
            case "move":
                moved = true;
                player.move(this.map, action.data);
                break;
            case "shoot":
                const projectile = player.shoot();
                if (projectile) this.projectiles.push(projectile);
            case "ability":
                player.useAbility();
            default:
                break;
        }

        if (!moved) player.isMoving = false;
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
            gameEnded: this.gameEnded,
            winner: this.winner,
            messages: this.messages,
        };
    }
}

export default GameManager;
