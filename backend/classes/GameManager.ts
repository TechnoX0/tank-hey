class GameManager {
    private readonly players = {}
    private readonly scores = {}
    public canvasWidth: number
    public canvasHeight: number

    public constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    assignPlayer(socketId: string) {}

    handlePlayerAction(socketId: string, data: object) {}

    removePlayer(socketId: string) {}

    updateGame() {}

    getGameState() {}
}

export default GameManager;
