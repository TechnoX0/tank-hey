class Vector2D {
    public x: number;
    public y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // Basic vector operations
    add(v: Vector2D): Vector2D { return new Vector2D(this.x + v.x, this.y + v.y); }
    subtract(v: Vector2D): Vector2D { return new Vector2D(this.x - v.x, this.y - v.y); }
    multiply(scalar: number): Vector2D { return new Vector2D(this.x * scalar, this.y * scalar); }
    divide(scalar: number): Vector2D { return new Vector2D(this.x / scalar, this.y / scalar); }
    clone(): Vector2D { return new Vector2D(this.x, this.y); }
    
    // Vector magnitude and normalization
    get magnitude() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    get normalized() { 
        const mag = this.magnitude;
        return mag > 0 ? this.divide(mag) : new Vector2D(); 
    }
    
    // Dot product
    dot(other: Vector2D): number { return this.x * other.x + this.y * other.y; }
    negate(): Vector2D {return new Vector2D(-this.x, -this.y)}
    magnitudeSquared(): number {return this.x * this.x + this.y * this.y}
    length() { return Math.hypot(this.x, this.y); }
    perpendicular(): Vector2D {
        return new Vector2D(-this.y, this.x);
    }
    
    // Distance between two vectors
    distanceTo(v: Vector2D): number { return this.subtract(v).magnitude; }
    vectorLength(): number {return (this.x ** 2 + this.y ** 2) ** 0.5}

    static tripleProduct(a: Vector2D, b: Vector2D, c: Vector2D): Vector2D {
        const ac = a.dot(c);
        const bc = b.dot(c);
        return new Vector2D(b.x * ac - a.x * bc, b.y * ac - a.y * bc);
    }

    public equals(other: Vector2D): boolean {
        // Compare x and y coordinates with a small epsilon to account for floating-point imprecision
        const epsilon = 0.0001;
        return (
            Math.abs(this.x - other.x) < epsilon &&
            Math.abs(this.y - other.y) < epsilon
        );
    }

    static fromAngle(degrees: number): Vector2D {
        const radians = degrees * (Math.PI / 180);
        return new Vector2D(Math.cos(radians), Math.sin(radians));
    }
}

export default Vector2D;