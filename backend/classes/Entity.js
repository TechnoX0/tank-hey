class Entity {
    constructor(x, y, speed, rotation = 0) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.rotation = rotation;
    }

    move(directionX, directionY) {
        this.x += directionX * this.speed;
        this.y += directionY * this.speed;
    }

    rotate(angle) {
        this.rotation = (this.rotation + angle) % 360;
    }
}
