import { useState } from "react";
import { SoundManager } from "../utils/SoundManager";

function TankClassSelector({
    tankClass,
    selectedClass,
    handleChange,
    hoverSoundPath = "Sound Effects/UI SFX/hover_tank.ogg", // default hover SFX
}: {
    tankClass: string;
    selectedClass: string;
    handleChange: (selected: string) => void;
    hoverSoundPath?: string;
}) {
    const [hovered, setHovered] = useState(false);

    function handleMouseEnter() {
        if (!hovered) {
            SoundManager.play(`/assets/Sound/${hoverSoundPath}`);
            setHovered(true);
        }
    }

    function handleMouseLeave() {
        setHovered(false);
    }

    return (
        <div key={tankClass} className="flex flex-col items-center">
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    className="flex w-auto h-[15dvh] rounded-sm"
                    src={`/assets/GUI/Tanks/${tankClass}.png`}
                    alt=""
                />
            </label>
        </div>
    );
}

export default TankClassSelector;
