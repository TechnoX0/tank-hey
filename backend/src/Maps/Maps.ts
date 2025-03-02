import MapData from "../interface/MapData";
import Vector2D from "../Utils/Vector2D";

const Maps: MapData[] = [
    {
        name: "Map 01",
        walls: [
            { start: new Vector2D(900, 0), end: new Vector2D(900, 100) },
            { start: new Vector2D(100, 100), end: new Vector2D(200, 100) },
            { start: new Vector2D(200, 100), end: new Vector2D(300, 100) },
            { start: new Vector2D(300, 100), end: new Vector2D(400, 100) },
            { start: new Vector2D(500, 100), end: new Vector2D(600, 100) },
            { start: new Vector2D(600, 100), end: new Vector2D(700, 100) },
            { start: new Vector2D(700, 100), end: new Vector2D(800, 100) },
            { start: new Vector2D(200, 100), end: new Vector2D(200, 200) },
            { start: new Vector2D(400, 100), end: new Vector2D(400, 200) },
            { start: new Vector2D(800, 100), end: new Vector2D(800, 200) },
            { start: new Vector2D(100, 200), end: new Vector2D(200, 200) },
            { start: new Vector2D(400, 200), end: new Vector2D(500, 200) },
            { start: new Vector2D(500, 200), end: new Vector2D(600, 200) },
            { start: new Vector2D(800, 200), end: new Vector2D(900, 200) },
            { start: new Vector2D(300, 200), end: new Vector2D(300, 300) },
            { start: new Vector2D(400, 200), end: new Vector2D(400, 300) },
            { start: new Vector2D(600, 200), end: new Vector2D(600, 300) },
            { start: new Vector2D(700, 200), end: new Vector2D(700, 300) },
            { start: new Vector2D(800, 200), end: new Vector2D(800, 300) },
            { start: new Vector2D(200, 300), end: new Vector2D(300, 300) },
            { start: new Vector2D(700, 300), end: new Vector2D(800, 300) },
            { start: new Vector2D(900, 300), end: new Vector2D(1000, 300) },
            { start: new Vector2D(100, 300), end: new Vector2D(100, 400) },
            { start: new Vector2D(200, 300), end: new Vector2D(200, 400) },
            { start: new Vector2D(400, 300), end: new Vector2D(400, 400) },
            { start: new Vector2D(600, 300), end: new Vector2D(600, 400) },
            { start: new Vector2D(800, 300), end: new Vector2D(800, 400) },
            { start: new Vector2D(900, 300), end: new Vector2D(900, 400) },
            { start: new Vector2D(300, 400), end: new Vector2D(400, 400) },
            { start: new Vector2D(400, 400), end: new Vector2D(500, 400) },
            { start: new Vector2D(600, 400), end: new Vector2D(700, 400) },
            { start: new Vector2D(100, 400), end: new Vector2D(100, 500) },
            { start: new Vector2D(200, 400), end: new Vector2D(200, 500) },
            { start: new Vector2D(300, 400), end: new Vector2D(300, 500) },
            { start: new Vector2D(500, 400), end: new Vector2D(500, 500) },
            { start: new Vector2D(600, 400), end: new Vector2D(600, 500) },
            { start: new Vector2D(700, 400), end: new Vector2D(700, 500) },
            { start: new Vector2D(800, 400), end: new Vector2D(800, 500) },
            { start: new Vector2D(200, 500), end: new Vector2D(300, 500) },
            { start: new Vector2D(800, 500), end: new Vector2D(900, 500) },
            { start: new Vector2D(900, 500), end: new Vector2D(1000, 500) },
            { start: new Vector2D(100, 500), end: new Vector2D(100, 600) },
            { start: new Vector2D(400, 500), end: new Vector2D(400, 600) },
            { start: new Vector2D(600, 500), end: new Vector2D(600, 600) },
        ]
    }
]

export default Maps