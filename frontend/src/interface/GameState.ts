interface GameState {
    id: string;
    map: any;
    players?: any;
    projectiles?: any;
    powerUps?: any;
    gameStarted?: boolean;
}

export default GameState;
