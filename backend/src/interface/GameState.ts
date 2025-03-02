import GameObject from "../Utils/GameObject";
import Projectile from "../Projectiles/Projectile";
import MapData from "./MapData";

interface GameState {
    map: MapData;
    players: Record<string, GameObject>;
    projectiles: Projectile[],
}

export default GameState