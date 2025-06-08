import GameState from "../interface/GameState";
import Player from "../interface/Player";
import ProgressBar from "./ProgressBar";

type Props = {
    gameState: GameState;
};

const className: Record<string, string> = {
    allrounder: "All Rounder",
    juggernaut: "Juggernaut",
    sniper: "Sniper",
    scout: "Scout",
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
                const ability = tank.ability;
                const abilityType = ability.stats.type;

                return (
                    <div>
                        <ProgressBar
                            min={0}
                            max={baseHealth}
                            value={health}
                            text={className[player.tankClass]}
                            variant={
                                abilityType === "fortess" && ability.isActive
                                    ? "shield"
                                    : "health"
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
};
