import GameObject from './GameObject';
import Vector2D from './Vector2D';

export function gjkCollision(shapeA: GameObject, shapeB: GameObject): boolean {
    let direction = shapeB.position.subtract(shapeA.position);
    if (direction.x === 0 && direction.y === 0) {
        direction = new Vector2D(1, 0);
    }

    const simplex: Vector2D[] = [];
    simplex.push(support(shapeA, shapeB, direction));
    direction = simplex[0].negate();

    while (true) {
        const newPoint = support(shapeA, shapeB, direction);
        if (newPoint.dot(direction) <= 0) {
            return false;
        }

        simplex.push(newPoint);
        if (handleSimplex(simplex, direction)) {
            return true;
        }
    }
}

function support(shapeA: GameObject, shapeB: GameObject, direction: Vector2D): Vector2D {
    const pointA = shapeA.getSupportPoint(direction);
    const pointB = shapeB.getSupportPoint(direction.negate());
    return pointA.subtract(pointB);
}

function handleSimplex(simplex: Vector2D[], direction: Vector2D): boolean {
    if (simplex.length === 2) {
        return processLine(simplex, direction);
    } else {
        return processTriangle(simplex, direction);
    }
}

function processLine(simplex: Vector2D[], direction: Vector2D): boolean {
    const a = simplex[0];
    const b = simplex[1];
    const ab = b.subtract(a);
    const ao = a.negate();
    
    direction = Vector2D.tripleProduct(ab, ao, ab);
    return false;
}

function processTriangle(simplex: Vector2D[], direction: Vector2D): boolean {
    const a = simplex[0];
    const b = simplex[1];
    const c = simplex[2];
    const ab = b.subtract(a);
    const ac = c.subtract(a);
    const ao = a.negate();
    
    const abPerp = Vector2D.tripleProduct(ac, ab, ab);
    const acPerp = Vector2D.tripleProduct(ab, ac, ac);
    
    if (abPerp.dot(ao) > 0) {
        simplex.splice(2, 1);
        direction = abPerp;
        return false;
    } 
    
    if (acPerp.dot(ao) > 0) {
        simplex.splice(1, 1);
        direction = acPerp;
        return false;
    }
    
    return true;
}
