import Vector2D from './Vector2D';

enum HitboxTypes {
    circle,
    polygon,
}

class Hitbox {
    public type: HitboxTypes;
    public position: Vector2D;
    public radius: number;
    public vertices: Vector2D[];

    constructor(type: HitboxTypes, position: Vector2D, radius: number = 0, vertices: Vector2D[] = []) {
        this.type = type;
        this.position = position
        this.radius = radius;
        this.vertices = vertices;
    }
}

export {Hitbox, HitboxTypes};
