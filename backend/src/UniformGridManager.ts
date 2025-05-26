import GameObject from "./GameObjects/GameObject";
import Wall from "./Maps/Wall";

class UniformGridManager {
    private cellSize: number;
    private grid: Map<string, { entities: GameObject[]; walls: Wall[] }>;

    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }

    private getCellKey(col: number, row: number): string {
        return `${col},${row}`;
    }

    private getObjectCellCoords(obj: GameObject): [number, number] {
        return [Math.floor(obj.position.x / this.cellSize), Math.floor(obj.position.y / this.cellSize)];
    }

    private getCellsForWall(wall: Wall): string[] {
        const cellSize = this.cellSize;

        let xMin = Infinity;
        let xMax = -Infinity;
        let yMin = Infinity;
        let yMax = -Infinity;

        for (const corner of wall.corners) {
            xMin = Math.min(xMin, corner.x);
            xMax = Math.max(xMax, corner.x);
            yMin = Math.min(yMin, corner.y);
            yMax = Math.max(yMax, corner.y);
        }

        const startCol = Math.floor(xMin / cellSize);
        const endCol = Math.floor(xMax / cellSize);
        const startRow = Math.floor(yMin / cellSize);
        const endRow = Math.floor(yMax / cellSize);

        const cells: string[] = [];

        for (let col = startCol; col <= endCol; col++) {
            for (let row = startRow; row <= endRow; row++) {
                cells.push(this.getCellKey(col, row));
            }
        }

        return cells;
    }


    public clear(): void {
        for (const cell of this.grid.values()) {
            cell.entities = []; // Only clear entities
            // Keep walls!
        }
    }

    public addEntity(entity: GameObject): void {
        const [col, row] = this.getObjectCellCoords(entity);
        const key = this.getCellKey(col, row);

        if (!this.grid.has(key)) {
            this.grid.set(key, { entities: [], walls: [] });
        }

        this.grid.get(key)!.entities.push(entity);
    }

    public addWall(wall: Wall): void {
        const keys = this.getCellsForWall(wall);

        for (const key of keys) {
            if (!this.grid.has(key)) {
                this.grid.set(key, { entities: [], walls: [] });
            }
            this.grid.get(key)!.walls.push(wall);
        }
    }

    public getNearbyEntities(obj: GameObject): GameObject[] {
        const [col, row] = this.getObjectCellCoords(obj);
        const nearby: GameObject[] = [];

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const key = this.getCellKey(col + dx, row + dy);
                if (this.grid.has(key)) {
                    nearby.push(...this.grid.get(key)!.entities);
                }
            }
        }

        return nearby;
    }

    public getNearbyWalls(obj: GameObject): Wall[] {
        const [col, row] = this.getObjectCellCoords(obj);
        const nearby: Wall[] = [];

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const key = this.getCellKey(col + dx, row + dy);
                if (this.grid.has(key)) {
                    nearby.push(...this.grid.get(key)!.walls);
                }
            }
        }

        return nearby;
    }
}

export default UniformGridManager;
