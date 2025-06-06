import { useNavigate } from "react-router";
import { getSocket } from "../Socket";

const socket = getSocket();

function MainMenu() {
    const navigate = useNavigate();

    function createRoom() {
        socket.emit("createRoom", "Room", (roomId: string) => {
            navigate("/game/" + roomId);
        });
    }

    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="flex flex-col bg-[#675645] min-w-[20dvh] align-center gap-5">
                <div className="flex justify-center pt-[3dvh]">
                    <img
                        className="flex w-full h-[30dvh] max-w-[40dvh]"
                        src="/assets/GUI/tank hey! icon.png"
                        alt="Tank Hey! Icon"
                    />
                </div>
                <div className="flex flex-col bg-[#675645] px-[5dvh] pb-[20dvh] gap-4">
                    <button
                        className="flex justify-center hover:cursor-pointer"
                        onClick={createRoom}
                    >
                        <img
                            className="flex w-[32dvh] h-full"
                            src="/assets/GUI/Buttons/play button.png"
                            alt="Play"
                        />
                    </button>

                    {/* <div className="flex justify-center">
                        <img
                            className="flex w-[32dvh] h-full"
                            src="/assets/GUI/Buttons/settings button.png"
                            alt="Settings"
                        />
                    </div> */}

                    <button
                        className="flex justify-center hover:cursor-pointer"
                        onClick={() => navigate("/credits")}
                    >
                        <img
                            className="flex w-[32dvh] h-full"
                            src="/assets/GUI/Buttons/credits button.png"
                            alt="Credits"
                        />
                    </button>

                    {/* <div className="flex justify-center">
                        <img
                            className="flex w-[32dvh] h-full"
                            src="/assets/GUI/Buttons/exit button.png"
                            alt="Exit"
                        />
                    </div> */}
                </div>
            </div>
            <img
                className="flex w-screen"
                src="/assets/GUI/ai tank.jpg"
                alt="Tank"
            />
        </div>
    );
}

export default MainMenu;
