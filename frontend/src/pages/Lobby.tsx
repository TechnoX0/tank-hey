import Player from "../interface/Player";

interface Props {
    handleColorChange: (newColor: string) => void;
    handleReadyChange: () => void;
    onStartGame: () => void;
    lobbyState: any;
    playerId: string;
    isOwner: boolean;
}

const colors = [
    "1f77b4",
    "ff7f0e",
    "2ca02c",
    "d62728",
    "9467bd",
    "8c564b",
    "e377c2",
    "7f7f7f",
    "bcbd22",
    "17becf",
];

function Lobby({
    handleColorChange,
    handleReadyChange,
    onStartGame,
    lobbyState,
    playerId,
    isOwner,
}: Props) {
    const players = lobbyState.players;
    const player = players[playerId];

    return (
        <div className="relative">
            <img
                className="absolute z-[-10] w-full h-screen x-0 y-0"
                src="/assets/GUI/blank lobby screen.png"
                alt="Settings Header"
            />
            <div className="flex flex-col pt-[15dvh] gap-8 justify-center align-center">
                <div className="flex flex-col p-[5dvh] mx-[20dvh] gap-5 rounded-lg justify-center bg-[#4d784e]">
                    <div className="grid grid-cols-4">
                        {(Object.values(players) as Player[]).map((player) => (
                            <div className="flex flex-col gap-5">
                                <div className="flex justify-center">
                                    <img
                                        className="w-[10dvh] h-full"
                                        src={`/assets/GUI/${
                                            player.isReady
                                                ? "ready"
                                                : "notReady"
                                        }.png`}
                                        alt="Status"
                                    />
                                </div>
                                <img
                                    className="w-[40dvh] h-full"
                                    src={`/assets/GUI/Frames/frame ${player.color}.png`}
                                    alt="Player-Frame"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        {colors.map((color) => (
                            <div key={color} className="flex">
                                <input
                                    type="radio"
                                    name="tankClass"
                                    className="peer hidden"
                                    id={color}
                                    value={color}
                                    checked={player.color === color}
                                    onChange={() => handleColorChange(color)}
                                />
                                <label
                                    htmlFor={color}
                                    style={{ backgroundColor: `#${color}` }}
                                    className="w-16 h-16 cursor-pointer peer-checked:border-4 peer-checked:border-white"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-row justify-center">
                    <div className="flex justify-center gap-8">
                        {isOwner ? (
                            <button
                                onClick={() => onStartGame()}
                                className="cursor-pointer"
                            >
                                <img
                                    className="w-[40dvh] h-full"
                                    src="/assets/GUI/Buttons/play button.png"
                                    alt="Ready"
                                />
                            </button>
                        ) : (
                            <button
                                onClick={() => handleReadyChange()}
                                className="cursor-pointer"
                            >
                                <img
                                    className="w-[40dvh] h-full"
                                    src="/assets/GUI/Buttons/ready button.png"
                                    alt="Ready"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lobby;
