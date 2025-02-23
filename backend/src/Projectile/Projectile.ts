import Entity from "../Entity";
import { Hitbox, HitboxTypes} from "../Hitbox";
import Tank from "../Tank";

abstract class Projectile extends Entity {
    public owner: string;
    public damage: number;

    constructor(owner: string, x: number, y: number, rotation: number, hitbox: HitboxTypes, speed: number = 2) {
        super(x, y, speed, new Hitbox(hitbox, x, y, 5), rotation);
        this.owner = owner;
        this.damage = 1;
    }

    abstract move(canvasWidth: number, canvasHeight: number, deltaTime: number): void;

    dealDamage(target: Tank) {
        target.health -= this.damage;
    }
}

export default Projectile;
