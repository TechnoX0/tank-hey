import GameManager from "./GameManager";

class RoomManager {
    createRoom(roomName) {
        const roomId = this.generateRoomId();
        const newRoom = {
            roomName: roomName,
            players: {},
            roomManager: new GameManager(800, 600),
        };
        this.rooms[roomId] = newRoom;
        return newRoom;
    }

    joinRoom(roomId) {
        if (!Object.keys(this.rooms).includes(roomId))
            return "Room does not exist!";
        return "Connected to room: " + roomId;
    }

    generateRoomId(length = 8) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let roomId = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            roomId += characters[randomIndex];
        }

        return roomId;
    }
}

export default RoomManager;
