import GameObject from "../GameObjects/GameObject";
import Movement from "../interface/Movement";
import Vector2D from "../Utils/Vector2D";
import MapData from "../interface/MapData";
import { CollisionType } from "../Utils/Enums";
import Collision from "../Utils/Collision";

class Tank extends GameObject implements Movement {
    public speed: number = 5;
    public rotation: number = 0;
    public health: number;
    public turnSpeed: number = 2

    constructor(position: Vector2D) {
        super(
            position,
            new Collision(CollisionType.polygon, new Vector2D(position.x, position.y), [
                new Vector2D(-15, -10),
                new Vector2D(15, -10),
                new Vector2D(15, 10),
                new Vector2D(-15, 10),
                new Vector2D(-15, -10),
            ]),
        );
        this.health = 100;
        this.originalVertices = this.hitbox.vertices;
    }

    move(map: MapData, forward: number) {
        const direction = forward ? 1 : -1

        let movementVector = new Vector2D(
            Math.cos(this.rotation * (Math.PI / 180)) * (this.speed * direction),
            Math.sin(this.rotation * (Math.PI / 180)) * (this.speed * direction)
        );
    
        this.hitbox.position = this.hitbox.position.add(movementVector)
        this.position = this.position.add(movementVector);
    }
    

    rotate(angle: number, map: MapData) {
        // Calculate the potential new rotation
        const newRotation = (this.rotation + angle) % 360;
        const newRad = (newRotation * Math.PI) / 180;
        
        // Calculate where vertices would be after rotation
        const potentialVertices = this.originalVertices.map(({ x, y }) => {
            const rotatedX = x * Math.cos(newRad) - y * Math.sin(newRad);
            const rotatedY = x * Math.sin(newRad) + y * Math.cos(newRad);
            
            return new Vector2D(rotatedX, rotatedY);
        });
        
        this.rotation = newRotation;
        this.hitbox.vertices = potentialVertices;
    }
}

export default Tank;
