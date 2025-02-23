import Entity from "../Entity";
import Projectile from "../Projectile/Projectile";

interface GameState {
    players: Record<string, Entity>;
    projectiles: Projectile[],
}

export default GameState