// Tank.js
import Entity from "./Entity.js";
import Hitbox from "./Hitbox.js";

class Tank extends Entity {
    constructor(x, y, speed, rotation = 0) {
        super(
            x,
            y,
            speed,
            new Hitbox("polygon", x, y, 0, [
                { x: -15, y: -10 },
                { x: 15, y: -10 },
                { x: 15, y: 10 },
                { x: -15, y: 10 },
                { x: -15, y: -10 },
            ]),
            rotation
        );
        this.health = 100;
        this.originalVertices = this.hitbox.vertices;
    }
}

export default Tank;
