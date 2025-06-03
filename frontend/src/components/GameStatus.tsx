import GameState from "../interface/GameState";
import Player from "../interface/Player";

type Props = {
    gameState: GameState;
};

export const GameStatus = ({ gameState }: Props) => {
    const players = Object.values(gameState.players) as Player[];
    //   console.log(players);

    return (
        <div>
            {players.map((player) => {
                const tank = player.tank;
                const health = tank.health;
                const baseHealth = tank.baseStats.health;

                return (
                    <div
                        key={player.id}
                        style={{ backgroundColor: `#${player.color}` }}
                        className="px-8 py-4 text-white"
                    >{`${health} / ${baseHealth}`}</div>
                );
            })}
        </div>
    );
};
