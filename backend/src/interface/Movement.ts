interface Movement {
    speed: number;
    rotation: number;
    move(...params: any): void;
    rotate?(clockwise: boolean, ...params: any): void;
}

export default Movement;