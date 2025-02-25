import GameObject from "../GameObject";
import Projectile from "../Projectile/Projectile";
import { MapData } from "../Maps/Map";

interface GameState {
    map: MapData;
    players: Record<string, GameObject>;
    projectiles: Projectile[],
}

export default GameState