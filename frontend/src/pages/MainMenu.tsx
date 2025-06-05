import React from "react";

function MainMenu() {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col bg-[#675645] min-w-fit gap-5">
                <img
                    className="w-full h-[30dvh] max-w-[40dvh]"
                    src="/assets/GUI/tank hey! icon.png"
                    alt="Tank Hey! Icon"
                />
                <div className="flex flex-col bg-[#675645] gap-4">
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
