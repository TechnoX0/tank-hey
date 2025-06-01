import Wall from '../Maps/Wall';
import Vector2D from '../Utils/Vector2D';

interface Line {
    start: Vector2D;
    end: Vector2D;
}

interface MapData {
    name: string;
    walls: Wall[];
}

export { Line, MapData };