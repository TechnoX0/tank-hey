interface Point {
    x: number;
    y: number;
  }
  
  interface Wall {
    start: Point;
    end: Point;
  }
  
  interface MapData {
    name: string;
    walls: Wall[];
  }
  
  const Maps: MapData[] = [
    {
      name: "Map 1",
      walls: [
        { start: { x: 100, y: 100 }, end: { x: 300, y: 100 } },
        { start: { x: 300, y: 100 }, end: { x: 300, y: 300 } },
        { start: { x: 300, y: 300 }, end: { x: 100, y: 300 } },
        { start: { x: 100, y: 300 }, end: { x: 100, y: 100 } },
      ],
    },
  ];
  
  export default Maps;
  