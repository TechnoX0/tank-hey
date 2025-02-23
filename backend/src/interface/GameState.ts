import Entity from "../Entity";
import Projectile from "../Projectile/Projectile";
import { MapData } from "../Maps/Map";

interface GameState {
    map: MapData;
    players: Record<string, Entity>;
    projectiles: Projectile[],
}

export default GameState