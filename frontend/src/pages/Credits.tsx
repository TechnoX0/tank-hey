import { useNavigate } from "react-router";
import GameButton from "../components/GameButton";

function Credits() {
    const navigate = useNavigate();

    return (
        <div className="relative w-screen h-screen text-white font-medium">
            <img
                className="absolute z-[-10] w-screen h-screen x-0 y-0"
                src="/assets/GUI/blank credits screen.png"
                alt="Settings Header"
            />
            <div className="flex flex-col gap-5 justify-between items-center w-full h-full">
                <div className="flex flex-row gap-5 mt-50 justify-center rounded-lg px-8 py-4 max-w-[60dvw] bg-[#4d784e]">
                    <div className="flex flex-col">
                        <img
                            className="h-full rounded-md"
                            src="/assets/GUI/tank hey! icon 2.png"
                            alt="Tank Hey! Icon"
                        />
                    </div>
                    <div className="flex flex-col gap-8 justify-center bg-[#283c24] p-[3dvh] w-full rounded-lg">
                        <div className="flex flex-col text-center gap-3">
                            <h1>Project Owner:</h1>
                            <h1>Jan Marc B. Yparraguirre</h1>
                        </div>
                        <div className="flex flex-col text-center gap-3">
                            <h1>Scrum Master:</h1>
                            <h1>Paul Vincent I. Meroy</h1>
                        </div>
                        <div className="flex flex-col text-center gap-3 pt-[2dvh]">
                            <h1>Development Team:</h1>
                        </div>
                        <div className="flex flex-row justify-center gap-12">
                            <div className="flex flex-col text-center gap-3">
                                <h1>Documentation:</h1>
                                <h1>John Selwyn M. Enecito</h1>
                            </div>
                            <div className="flex flex-col text-center gap-3">
                                <h1>Frontend Developer:</h1>
                                <h1>Dan Justine C. Ibarra</h1>
                            </div>
                            <div className="flex flex-col text-center gap-3">
                                <h1>Map Designer:</h1>
                                <h1>Fred Joshua Y. Conopio</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <GameButton
                    func={() => navigate("/")}
                    imagePath="GUI/Buttons/back button.png"
                    soundPath="Sound Effects/UI SFX/click_back.ogg"
                    className="flex flex-col self-start mx-8 my-4"
                />
                {/* <button
                    className="flex flex-col self-start mx-8 my-4"
                    onClick={() => navigate("/")}
                >
                    <img
                        className="w-[30dvh] h-full"
                        src="/assets/GUI/Buttons/back button.png"
                        alt="Back Button"
                    />
                </button> */}
            </div>
        </div>
    );
}

export default Credits;
