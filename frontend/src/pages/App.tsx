// import { useRef } from "react";
import { useNavigate } from "react-router";
import { getSocket } from "../Socket";

const socket = getSocket();

function App() {
    const navigate = useNavigate();
    // const roomNameRef = useRef<HTMLInputElement>(null);

    function createRoom() {
        socket.emit("createRoom", "Room", (roomId: string) => {
            navigate("/game/" + roomId);
        });
    }

    //   function options() {

    //   }

    //   function exit() {

    //   }

    return (
        <main className="bg-[#675645]">
            <div className="flex flex-col">
                <button onClick={createRoom}>Play</button>
                <button>Options</button>
                <button>Exit</button>
            </div>
        </main>
    );
}

export default App;
