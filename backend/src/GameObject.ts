import { Hitbox } from "./Hitbox";
import Vector2D from "./Vector2D";

abstract class GameObject {
    public position: Vector2D;
    public hitbox: Hitbox;
    public color: string;
    public originalVertices: Vector2D[];

    constructor(position: Vector2D, hitbox: Hitbox) {
        this.position = position;
        this.hitbox = hitbox;
        this.color = "orange";

        this.originalVertices = hitbox.vertices;
    }
}

export default GameObject;
