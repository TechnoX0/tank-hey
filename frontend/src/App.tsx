import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
    return (
        <main className="w-screen h-screen bg-orange-200">
            <h1 className="w-12 h-12 bg-red-100"></h1>
        </main>
    );
}

export default App;
