import GameObject from "../GameObjects/GameObject";
import PowerUp from "../GameObjects/PowerUps/PowerUp";
import Projectile from "../GameObjects/Projectiles/Projectile";
import Player from "../Utils/Player";
import { MapData } from "./Map";
import Message from "./Message";

interface GameState {
    map: MapData;
    players: Record<string, Player>;
    projectiles: Projectile[];
    powerUps: Record<string, PowerUp>;
    gameStarted: boolean;
    messages: Message[];
}

export default GameState;
