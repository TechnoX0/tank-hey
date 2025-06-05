import React from "react";

function Settings() {
    return (
        <div className="relative text-white font-medium">
            <img
                className="absolute z-[-10] w-full h-screen x-0 y-0"
                src="/assets/GUI/blank settings screen.png"
                alt="Settings Header"
            />
            <div className="flex flex-col gap-5 justify-center align-center">
                <div className="flex flex-row pr-[5dvh] py-[5dvh] mx-[20dvh] mt-[15dvh] min-h-[68dvh] gap-5 rounded-lg justify-start bg-[#4d784e]">
                    <div className="flex flex-col min-w-max gap-5 pr-[3dvh]">
                        <div className="flex">
                            <img
                                className="w-[60vh] h-full"
                                src="/assets/GUI/Buttons/volume button.png"
                                alt="Volume"
                            />
                        </div>
                        <div className="flex">
                            <img
                                className="w-[60vh] h-full"
                                src="/assets/GUI/Buttons/controls button.png"
                                alt="Controls"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 bg-[#283c24] p-[3dvh] w-full rounded-lg">
                        <div className="flex flex-col gap-3">
                            <h1>Master Volume:</h1>
                            <h1>Music Volume:</h1>
                            <h1>Game Volume:</h1>
                            <h1>SFX Volume:</h1>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1>00%</h1>
                            <h1>00%</h1>
                            <h1>00%</h1>
                            <h1>00%</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col pl-[25dvh]">
                    <img
                        className="w-[30dvh] h-full"
                        src="/assets/GUI/Buttons/back button.png"
                        alt="Back Button"
                    />
                </div>
            </div>
        </div>
    );
}

export default Settings;
