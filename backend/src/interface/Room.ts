import GameManager from "../GameManager";

interface Room {
    id: string;
    roomName: string;
    players: string[];
    gameManager: GameManager;
    lastActive: number;
}

export default Room