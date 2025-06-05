import React from "react";

function Lobby() {
    return (
        <div className="relative">
            <img
                className="absolute z-[-10] w-full h-screen x-0 y-0"
                src="/assets/GUI/blank lobby screen.png"
                alt="Settings Header"
            />
            <div className="flex flex-col pt-[15dvh] gap-8 justify-center align-center">
                <div className="flex flex-row p-[5dvh] mx-[20dvh] gap-5 rounded-lg justify-center bg-[#4d784e]">
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-center">
                            <img
                                className="w-[10dvh] h-full"
                                src="/assets/GUI/ready.png"
                                alt="Status"
                            />
                        </div>
                        <img
                            className="w-[40dvh] h-full"
                            src="/assets/GUI/Frames/blue frame.png"
                            alt="Player-Frame"
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex justify-center">
                            <img
                                className="w-[10dvh] h-full"
                                src="/assets/GUI/notReady.png"
                                alt="Status"
                            />
                        </div>
                        <img
                            className="w-[40dvh] h-full"
                            src="/assets/GUI/Frames/orange frame.png"
                            alt="Player-Frame"
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-center">
                            <img
                                className="w-[10dvh] h-full"
                                src="/assets/GUI/ready.png"
                                alt="Status"
                            />
                        </div>
                        <img
                            className="w-[40dvh] h-full"
                            src="/assets/GUI/Frames/green frame.png"
                            alt="Player-Frame"
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-center">
                            <img
                                className="w-[10dvh] h-full"
                                src="/assets/GUI/ready.png"
                                alt="Status"
                            />
                        </div>
                        <img
                            className="w-[40dvh] h-full"
                            src="/assets/GUI/Frames/red frame.png"
                            alt="Player-Frame"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-center">
                    <div className="flex justify-center gap-8">
                        <img
                            className="w-full h-[8dvh] mt-[1.5dvh]"
                            src="/assets/GUI/Buttons/settings button 2.png"
                            alt="Settings"
                        />
                        <img
                            className="w-[40dvh] h-full"
                            src="/assets/GUI/Buttons/ready button.png"
                            alt="Ready"
                        />
                        <img
                            className="w-full h-[8dvh] mt-[1.5dvh]"
                            src="/assets/GUI/Buttons/main menu button.png"
                            alt="Main Menu"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lobby;
