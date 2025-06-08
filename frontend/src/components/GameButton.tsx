import { useState } from "react";
import { SoundManager } from "../utils/SoundManager";

interface Props {
    func: (func?: any) => void;
    imagePath: string;
    soundPath?: string;
    className?: string;
    hoverSoundPath?: string; // optional hover SFX
}

function GameButton({
    func,
    imagePath,
    soundPath,
    className,
    hoverSoundPath,
}: Props) {
    const [hasHovered, setHasHovered] = useState(false);

    function clickButton() {
        SoundManager.play(`/assets/Sound/${soundPath}`, 0.5);
        func();
    }

    function handleMouseEnter() {
        if (!hasHovered && hoverSoundPath) {
            SoundManager.play(`/assets/Sound/${hoverSoundPath}`);
            setHasHovered(true);
        }
    }

    function handleMouseLeave() {
        setHasHovered(false); // reset hover state
    }

    return (
        <button
            className={`hover:cursor-pointer ${className}`}
            onClick={clickButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                className="flex w-[32dvh] h-full"
                src={`/assets/${imagePath}`}
                alt="Play"
            />
        </button>
    );
}

export default GameButton;
