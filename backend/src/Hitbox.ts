import Vertices from './interface/Vertices';

enum HitboxTypes {
    circle,
    polygon,
}

class Hitbox {
    public type: HitboxTypes;
    public x: number;
    public y: number;
    public radius: number;
    public vertices: Vertices[];

    constructor(type: HitboxTypes, x: number, y: number, radius: number = 0, vertices: Vertices[] = []) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vertices = vertices; // Used for polygons and lines
    }
}

export {Hitbox, HitboxTypes};
