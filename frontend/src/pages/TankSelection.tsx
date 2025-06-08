import { Dispatch, SetStateAction } from "react";
import { TankClasses } from "../data/ClassData";
import TankClassSelector from "../components/TankClassSelector";
import GameButton from "../components/GameButton";

const classes = ["juggernaut", "sniper", "scout", "allrounder"];

interface Props {
    selectedClass: string;
    handleChange: (newClass: string) => void;
    handleLock: Dispatch<SetStateAction<boolean>>;
}

function TankSelection({ selectedClass, handleChange, handleLock }: Props) {
    const tankData = TankClasses[selectedClass];

    return (
        <div className="flex flex-col gap-4 w-screen h-screen pt-50">
            <img
                className="fixed z-[-10] w-full h-screen left-0 top-0"
                src="\assets\GUI\blank tank selection screen.png"
                alt="HeaderImage"
            />
            <div className="flex justify-center align-center">
                <div className="flex justify-center items-center w-[50dvw] h-[30dvh] bg-[#3c3228] text-white">
                    <img
                        className="h-full rounded-s"
                        src={`/assets/GUI/Tanks/${selectedClass}.png`}
                        alt="Tank"
                    />
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col justify-between h-full p-2 bg-[#473b2f]">
                            <h1 className="flex justify-center font-bold text-2xl">
                                Statistics
                            </h1>
                            <div className="flex justify-around bg-[#473b2f]">
                                <div>
                                    <div className="flex flex-row">
                                        <p>HP: {tankData.hp}</p>
                                    </div>

                                    <div className="flex flex-row">
                                        <p>ATK: {tankData.attack}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-row">
                                        <p>SPD: {tankData.speed}</p>
                                    </div>

                                    <div className="flex flex-row">
                                        <p>ATK SPD: {tankData.attack_speed}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4 bg-[#281c14]">
                                <div className="flex flex-col justify-center align-center p-2 gap-1 min-w-max">
                                    <img
                                        className="flex justify-center align-center w-auto h-[15dvh] rounded-md"
                                        src={`/assets/TankSprites/Abilities/${tankData.ability_name}.png`}
                                        alt={tankData.ability_name}
                                    />
                                </div>
                                <div className="px-4 py-2">
                                    <h1>{tankData.ability_description}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GameButton
                func={() => handleLock(true)}
                imagePath="GUI/Buttons/lock button.png"
                soundPath="Sound Effects/UI SFX/click_confirm.ogg"
                className="flex flex-row justify-center"
            />
            <div className="flex flex-row justify-center gap-5">
                {classes.map((tankClass) => (
                    <TankClassSelector
                        tankClass={tankClass}
                        selectedClass={selectedClass}
                        handleChange={() => handleChange(tankClass)}
                    />
                ))}
            </div>
        </div>
    );
}

export default TankSelection;
