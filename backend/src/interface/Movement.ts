interface Movement {
    speed: number;
    rotation: number;
    move(canvasWidth: number, canvasHeight: number, ...params: any): void;
    rotate(angle: number): void;
}

export default Movement;