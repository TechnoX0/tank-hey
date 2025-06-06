import Player from "./Player";

interface GameState {
    id: string;
    map: any;
    players?: any;
    projectiles?: any;
    powerUps?: any;
    gameStarted?: boolean;
    gameEnded: boolean;
    winner?: Player;
}

export default GameState;
