import { Dispatch, SetStateAction } from "react";
import { TankClasses } from "../data/ClassData";

const classes = ["juggernaut", "sniper", "scout", "allrounder"];

interface Props {
    selectedClass: string;
    handleChange: (newClass: string) => void;
    handleLock: Dispatch<SetStateAction<boolean>>;
}

function TankSelection({ selectedClass, handleChange, handleLock }: Props) {
    const tankData = TankClasses[selectedClass];

    return (
        <div className="relative flex flex-col justify-center gap-4 w-screen h-screen py-60">
            <img
                className="absolute z-[-10] w-full h-screen x-0 y-0"
                src="\public\assets\GUI\blank tank selection screen.png"
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
                        <div className="flex flex-col justify-center p-2 bg-[#473b2f]">
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
                                        className="flex justify-center align-center w-auto h-[15dvh] rounded-[100%]"
                                        src="/assets/GUI/skilltemp.png"
                                        alt="Skill"
                                    />
                                    <h1 className="font-bold">
                                        {tankData.ability_name}
                                    </h1>
                                </div>
                                <div className="py-4">
                                    <h1>{tankData.ability_description}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center cursor-pointer">
                <img
                    className="w-auto h-[10dvh]"
                    src="/assets/GUI/Buttons/lock button.png"
                    alt="Lock Button"
                    onClick={() => handleLock(true)}
                />
            </div>
            <div className="flex flex-row justify-center gap-5">
                {classes.map((tankClass) => (
                    <div
                        key={tankClass}
                        className={`flex flex-col items-center`}
                    >
                        <input
                            type="radio"
                            name="tankClass"
                            className="hidden peer"
                            id={tankClass}
                            value={tankClass}
                            checked={selectedClass === tankClass}
                            onChange={() => handleChange(tankClass)}
                        />
                        <label
                            htmlFor={tankClass}
                            className="border-4 border-transparent rounded-md peer-checked:border-[#32a852] cursor-pointer"
                        >
                            <img
                                className="flex w-auto h-[15dvh] rounded-sm"
                                src={`/assets/GUI/Tanks/${tankClass}.png`}
                                alt=""
                            />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TankSelection;
