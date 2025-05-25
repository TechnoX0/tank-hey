import { MapData } from "../interface/Map";
import Vector2D from "../Utils/Vector2D";
import Wall from "./Wall";

const Maps: MapData[] = [
    {
        name: "Map 01",
        walls: [
            new Wall(new Vector2D(0, 0), new Vector2D(1000, 0), 4),
            new Wall(new Vector2D(1000, 0), new Vector2D(1000, 600), 4),
            new Wall(new Vector2D(1000, 600), new Vector2D(0, 600), 4),
            new Wall(new Vector2D(0, 600), new Vector2D(0, 0), 4),
            new Wall(new Vector2D(900, 0), new Vector2D(900, 100), 4),
            new Wall(new Vector2D(100, 100), new Vector2D(200, 100), 4),
            new Wall(new Vector2D(200, 100), new Vector2D(300, 100), 4),
            new Wall(new Vector2D(300, 100), new Vector2D(400, 100), 4),
            new Wall(new Vector2D(500, 100), new Vector2D(600, 100), 4),
            new Wall(new Vector2D(600, 100), new Vector2D(700, 100), 4),
            new Wall(new Vector2D(700, 100), new Vector2D(800, 100), 4),
            new Wall(new Vector2D(200, 100), new Vector2D(200, 200), 4),
            new Wall(new Vector2D(400, 100), new Vector2D(400, 200), 4),
            new Wall(new Vector2D(800, 100), new Vector2D(800, 200), 4),
            new Wall(new Vector2D(100, 200), new Vector2D(200, 200), 4),
            new Wall(new Vector2D(400, 200), new Vector2D(500, 200), 4),
            new Wall(new Vector2D(500, 200), new Vector2D(600, 200), 4),
            new Wall(new Vector2D(800, 200), new Vector2D(900, 200), 4),
            new Wall(new Vector2D(300, 200), new Vector2D(300, 300), 4),
            new Wall(new Vector2D(400, 200), new Vector2D(400, 300), 4),
            new Wall(new Vector2D(600, 200), new Vector2D(600, 300), 4),
            new Wall(new Vector2D(700, 200), new Vector2D(700, 300), 4),
            new Wall(new Vector2D(800, 200), new Vector2D(800, 300), 4),
            new Wall(new Vector2D(200, 300), new Vector2D(300, 300), 4),
            new Wall(new Vector2D(700, 300), new Vector2D(800, 300), 4),
            new Wall(new Vector2D(900, 300), new Vector2D(1000, 300), 4),
            new Wall(new Vector2D(100, 300), new Vector2D(100, 400), 4),
            new Wall(new Vector2D(200, 300), new Vector2D(200, 400), 4),
            new Wall(new Vector2D(400, 300), new Vector2D(400, 400), 4),
            new Wall(new Vector2D(600, 300), new Vector2D(600, 400), 4),
            new Wall(new Vector2D(800, 300), new Vector2D(800, 400), 4),
            new Wall(new Vector2D(900, 300), new Vector2D(900, 400), 4),
            new Wall(new Vector2D(300, 400), new Vector2D(400, 400), 4),
            new Wall(new Vector2D(400, 400), new Vector2D(500, 400), 4),
            new Wall(new Vector2D(600, 400), new Vector2D(700, 400), 4),
            new Wall(new Vector2D(100, 400), new Vector2D(100, 500), 4),
            new Wall(new Vector2D(200, 400), new Vector2D(200, 500), 4),
            new Wall(new Vector2D(300, 400), new Vector2D(300, 500), 4),
            new Wall(new Vector2D(500, 400), new Vector2D(500, 500), 4),
            new Wall(new Vector2D(600, 400), new Vector2D(600, 500), 4),
            new Wall(new Vector2D(700, 400), new Vector2D(700, 500), 4),
            new Wall(new Vector2D(800, 400), new Vector2D(800, 500), 4),
            new Wall(new Vector2D(200, 500), new Vector2D(300, 500), 4),
            new Wall(new Vector2D(800, 500), new Vector2D(900, 500), 4),
            new Wall(new Vector2D(900, 500), new Vector2D(1000, 500), 4),
            new Wall(new Vector2D(100, 500), new Vector2D(100, 600), 4),
            new Wall(new Vector2D(400, 500), new Vector2D(400, 600), 4),
            new Wall(new Vector2D(600, 500), new Vector2D(600, 600), 4)
        ]
    }
]

export default Maps