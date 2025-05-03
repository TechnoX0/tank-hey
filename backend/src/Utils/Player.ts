import Tank from "../Tanks/Tank";
import Vector2D from "./Vector2D";

class Player {
    public id: string;
    public score: number = 0;
    public isHost: boolean;
    public isReady: boolean = false;
    public color: string = "#1f77b4";
    public isAlive: boolean = true;
    public tankClass: string = "tank";
    public tank: Tank;

  constructor(socketId: string, isHost?: boolean) {
    this.id = socketId;
    this.isHost = isHost || false;
    this.tank = new Tank(socketId, new Vector2D(40, 40));
  }
}

export default Player;