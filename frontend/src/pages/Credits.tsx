import React from "react";

function Credits() {
    return (
        <div className="relative text-white font-medium">
            <img
                className="absolute z-[-10] w-full h-screen x-0 y-0"
                src="/assets/GUI/blank credits screen.png"
                alt="Settings Header"
            />
            <div className="flex flex-col gap-5 justify-center align-center">
                <div className="flex flex-row pr-[5dvh] py-[5dvh] mx-[20dvh] mt-[15dvh] min-h-[68dvh] gap-5 rounded-lg justify-center bg-[#4d784e]">
                    <div className="flex flex-col min-w-max gap-5 pl-[6dvh] pr-[3dvh]">
                        <div className="flex py-18 rounded-lg bg-[#3c3228]">
                            <img
                                className="w-[60vh] h-full rounded-md"
                                src="/assets/GUI/tank hey! icon 2.png"
                                alt="Tank Hey! Icon"
                            />
                        </div>
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

export default Credits;
