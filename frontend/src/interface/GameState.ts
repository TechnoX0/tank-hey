interface GameState {
    id: string;
    map: any;
    players?: any;
    projectiles?: any;
    gameStarted?: boolean;
}

export default GameState