interface Movement {
    speed: number;
    rotation: number;
    move(...params: any): void;
    rotate(angle: number,...params: any): void;
}

export default Movement;