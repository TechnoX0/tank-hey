import Collision from "../Utils/Collision";
import Vector2D from "../Utils/Vector2D";

abstract class GameObject {
    public position: Vector2D;
    public hitbox: Collision;
    public originalVertices: Vector2D[];

    constructor(position: Vector2D, hitbox: Collision) {
        this.position = position;
        this.hitbox = hitbox;
        this.originalVertices = hitbox.vertices;
    }
}

export default GameObject;
