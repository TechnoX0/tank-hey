import AllRounder from "../GameObjects/Tanks/AllRounder";
import Juggernaut from "../GameObjects/Tanks/Juggernaut";
import Scout from "../GameObjects/Tanks/Scout";
import Sniper from "../GameObjects/Tanks/Sniper";
import Tank from "../GameObjects/Tanks/Tank";
import Vector2D from "./Vector2D";

class Player {
    public id: string;
    public score: number = 0;
    public isHost: boolean;
    public isReady: boolean = false;
    public color: string = "1f77b4";
    public isAlive: boolean = true;
    public tankClass: string = "juggernaut";
    public tank: Tank;

    constructor(socketId: string, isHost?: boolean) {
        this.id = socketId;
        this.isHost = isHost || false;
        this.tank = new Juggernaut(socketId, new Vector2D(40, 40));
    }

    public setTankClass(tankClass: string) {
        this.tankClass = tankClass;

        switch (tankClass) {
            case "juggernaut":
                this.tank = new Juggernaut(this.id, new Vector2D(40, 40));
                break;
            case "sniper":
                this.tank = new Sniper(this.id, new Vector2D(40, 40));
                break;
            case "scout":
                this.tank = new Scout(this.id, new Vector2D(40, 40));
                break;
            case "allrounder":
                this.tank = new AllRounder(this.id, new Vector2D(40, 40));
                break;
            // Add other tank classes here as needed
            default:
                this.tank = new Juggernaut(this.id, new Vector2D(40, 40));
        }
    }

    public setColor(color: string) {
        this.color = color;
    }

    public setIsReady(isReady: boolean) {
        this.isReady = isReady;
    }
}

export default Player;
