class Vector2D {
    public x: number;
    public y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // Basic vector operations
    add(v: Vector2D) { return new Vector2D(this.x + v.x, this.y + v.y); }
    subtract(v: Vector2D) { return new Vector2D(this.x - v.x, this.y - v.y); }
    multiply(scalar: number) { return new Vector2D(this.x * scalar, this.y * scalar); }
    divide(scalar: number) { return new Vector2D(this.x / scalar, this.y / scalar); }
    
    // Vector magnitude and normalization
    get magnitude() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    get normalized() { 
        const mag = this.magnitude;
        return mag > 0 ? this.divide(mag) : new Vector2D(); 
    }
    
    // Dot product
    dot(v: Vector2D) { return this.x * v.x + this.y * v.y; }
    
    // Distance between two vectors
    distanceTo(v: Vector2D) { return this.subtract(v).magnitude; }
}

export default Vector2D;