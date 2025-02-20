import { useRef } from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
    const navigate = useNavigate();
    const roomNameRef = useRef<HTMLInputElement>(null);

    function createRoom() {
        if (roomNameRef.current == null || roomNameRef.current.value == "")
            return;
        socket.emit(
            "createRoom",
            roomNameRef.current.value,
            (roomId: string) => {
                navigate("/game/" + roomId);
            }
        );
    }

    return (
        <main className="w-screen h-screen">
            <div>
                <input
                    type="text"
                    className="border"
                    ref={roomNameRef}
                    defaultValue={"Room"}
                />
                <button onClick={createRoom}>Create room</button>
            </div>
            <button>Join room</button>
        </main>
    );
}

export default App;
