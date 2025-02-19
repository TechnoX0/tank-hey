class Entity {
    x: number;
    y: number;
    speed: number;
    rotation: number;

    constructor(x: number, y: number, speed: number, rotation: number = 0) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.rotation = rotation;
    }

    move(directionX: number, directionY: number) {
        this.x += directionX * this.speed;
        this.y += directionY * this.speed;
    }

    rotate(angle: number) {
        this.rotation = (this.rotation + angle) % 360;
    }
}
