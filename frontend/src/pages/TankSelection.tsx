import React from "react";

function TankSelection() {
    return (
        <div className="flex flex-col">
            <div className="relative text-white">
                <img
                    className="absolute z-[-10] w-full h-screen x-0 y-0"
                    src="assets/GUI/blank tank selection screen.png"
                    alt="HeaderImage"
                />
                <div className="flex pt-[20dvh] justify-center align-center">
                    <div className="flex justify-center items-center w-[60dvw] gap-10 bg-[#3c3228]">
                        <img
                            className="w-[25dvw] ml-10"
                            src="/assets/GUI/Tanks/juggernaut.png"
                            alt="Tank"
                        />
                        <div className="flex flex-col">
                            <div className="flex flex-col px-[1dvh] pb-[1dvh] justify-center bg-[#473b2f]">
                                <h1 className="flex justify-center">
                                    Statistics
                                </h1>
                                <div className="flex flex-col pl-[1dvh] bg-[#473b2f]">
                                    <div className="flex flex-row justify-between pr-[40dvh]">
                                        <div>HP: </div>
                                        <div>000</div>
                                    </div>

                                    <div className="flex flex-row justify-between pr-[40dvh]">
                                        <div>ATK: </div>
                                        <div>000</div>
                                    </div>

                                    <div className="flex flex-row justify-between pr-[40dvh]">
                                        <div>SPD: </div>
                                        <div>000</div>
                                    </div>

                                    <div className="flex flex-row justify-between pr-[40dvh]">
                                        <div>ATK SPD: </div>
                                        <div>000</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row bg-[#281c14] p-[1dvh]">
                                <div className="flex flex-col justify-center align-center p-2 gap-1 min-w-max">
                                    <img
                                        className="flex justify-center align-center w-auto h-[15dvh] rounded-[100%]"
                                        src="/assets/GUI/skilltemp.png"
                                        alt="Skill"
                                    />
                                    <h1 className="font-bold">Full Impact</h1>
                                </div>
                                <div className="flex p-[3dvh]">
                                    {/* Full Impact */}
                                    <h1>
                                        Increases projectile size and impact
                                        area, allowing your attacks to hit a
                                        wider range of targets for a limited
                                        time.
                                    </h1>

                                    {/* Iron Focus */}
                                    {/* <h1>
                                        Grants temporary invulnerability while
                                        enhancing your damage output, letting
                                        you strike with precision and power
                                        without interruption.
                                    </h1> */}

                                    {/* Ghost Step  */}
                                    {/* <h1>
                                        Grants temporary invisibility and
                                        increases movement speed, allowing you
                                        to move unseen and quickly reposition.
                                    </h1> */}

                                    {/* Fortify */}
                                    {/* <h1>
                                        Generates a protective shield that
                                        absorbs incoming damage for a short
                                        duration, enhancing your survivability.
                                    </h1> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center py-[4dvh]">
                <img
                    className="w-auto h-[10dvh]"
                    src="/assets/GUI/Buttons/lock button.png"
                    alt="Lock Button"
                />
            </div>
            <div className="flex flex-row justify-center gap-5">
                <img
                    className="flex w-auto h-[15dvh]"
                    src="/assets/GUI/Tanks/juggernaut.png"
                    alt="Juggernaut"
                />

                <img
                    className="flex w-auto h-[15dvh]"
                    src="/assets/GUI/Tanks/sniper.png"
                    alt="Sniper"
                />

                <img
                    className="flex w-auto h-[15dvh]"
                    src="/assets/GUI/Tanks/scout.png"
                    alt="Scout"
                />

                <img
                    className="flex w-auto h-[15dvh]"
                    src="/assets/GUI/Tanks/all-rounder.png"
                    alt="All-Rounder"
                />
            </div>
        </div>
    );
}

export default TankSelection;
