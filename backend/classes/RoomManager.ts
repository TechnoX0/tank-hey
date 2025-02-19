import GameManager from "./GameManager";

class RoomManager {
    private readonly rooms = {}
    public canvasWidth: number
    public canvasHeight: number

    createRoom(roomName: string) {
        const roomId = this.generateRoomId()
        const newRoom = {
            roomName: roomName,
            players: {},
            roomManager: new GameManager(800, 600)
        }
        this.rooms[roomId] = newRoom
        return newRoom
    }

    joinRoom(roomId: string) {
        if (!Object.keys(this.rooms).includes(roomId)) return "Room does not exist!"
        return "Connected to room: " + roomId
    }

    generateRoomId(length: number = 8) {
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let roomId: string = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex: number = Math.floor(Math.random() * characters.length);
            roomId += characters[randomIndex];
        }
        
        return roomId;
    }
}

export default RoomManager;
