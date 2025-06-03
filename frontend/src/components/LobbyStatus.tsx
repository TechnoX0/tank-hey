import { LobbyState } from "../interface/LobbyState";

type Props = {
    lobbyState: LobbyState;
};

function LobbyStatus({ lobbyState }: Props) {
    const { players } = lobbyState;

    return (
        <div>
            {Object.keys(players).map((player) => {
                const playerData = players[player];

                return (
                    <div
                        key={player}
                        style={{ backgroundColor: `#${playerData.color}` }}
                        className="grid place-items-center w-32 h-8 text-center text-white"
                    >
                        {playerData.tankClass.toUpperCase()}
                    </div>
                );
            })}
        </div>
    );
}

export default LobbyStatus;
