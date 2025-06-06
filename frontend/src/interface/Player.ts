import { Entity } from "./Entity";

interface Player {
    id: string;
    score: number;
    isHost: boolean;
    isReady: boolean;
    color: string;
    tankClass: string;
    tank: Entity;
}

export default Player;
