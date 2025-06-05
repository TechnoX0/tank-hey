import React from "react";

function MainMenu() {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col bg-[#675645] min-w-[20dvh] align-center gap-5">
                <div className="flex justify-center pt-[3dvh]">
                    <img
                        className="flex w-full h-[30dvh] max-w-[40dvh]"
                        src="/assets/GUI/tank hey! icon.png"
                        alt="Tank Hey! Icon"
                    />
                </div>
                <div className="flex flex-col bg-[#675645] px-[5dvh] pb-[20dvh] gap-4">
                    <div className="flex justify-center">
                        <img
                            className="flex w-[32dvh] h-full"
                            src="/assets/GUI/Buttons/play button.png"
                            alt="Play"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            className="flex w-[32dvh] h-full"
                            src="/assets/GUI/Buttons/settings button.png"
                            alt="Settings"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            className="flex w-[32dvh] h-full"
                            src="/assets/GUI/Buttons/credits button.png"
                            alt="Credits"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            className="flex w-[32dvh] h-full"
                            src="/assets/GUI/Buttons/exit button.png"
                            alt="Exit"
                        />
                    </div>
                </div>
            </div>
            <img
                className="flex w-[150dvh] h-full"
                src="/assets/GUI/ai tank.jpg"
                alt="Tank"
            />
        </div>
    );
}

export default MainMenu;
