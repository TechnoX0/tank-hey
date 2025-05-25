import GameObject from "../GameObjects/GameObject";
import Projectile from "../Projectiles/Projectile";
import Player from "../Utils/Player";
import { MapData } from "./Map";
import Message from "./Message";

interface GameState {
    map: MapData;
    players: Record<string, Player>;
    projectiles: Projectile[],
    gameStarted: boolean;
    messages: Message[];
}

export default GameState