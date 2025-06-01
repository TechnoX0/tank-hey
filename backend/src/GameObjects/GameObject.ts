import Collision from "../Utils/Collision";
import { EntityType } from "../Utils/Enums";
import Vector2D from "../Utils/Vector2D";

abstract class GameObject {
    public id: string;
    public position: Vector2D;
    public hitbox: Collision;
    public originalVertices: Vector2D[];
    public entityType: EntityType;

    constructor(
        id: string,
        position: Vector2D,
        hitbox: Collision,
        entityType: EntityType
    ) {
        this.id = id;
        this.position = position;
        this.hitbox = hitbox;
        this.originalVertices = hitbox.vertices;
        this.entityType = entityType;
    }
}

export default GameObject;
