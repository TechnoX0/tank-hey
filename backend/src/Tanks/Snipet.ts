import Vector2D from "../Utils/Vector2D";
import Tank from "./Tank";

class Sniper extends Tank {
    constructor(id: string, position: Vector2D) {
        super(id, position);
        this.baseHealth = 100;
        this.health = this.baseHealth;
        this.baseSpeed = 3;
        this.speed = this.baseSpeed;
        this.baseTurnSpeed = 2;
        this.turnSpeed = this.baseTurnSpeed;
    }
}

export default Sniper;