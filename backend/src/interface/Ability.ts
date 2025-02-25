import Tank from "../Tank";

interface Ability {
    id: string;
    name: string;
    cooldown: number;
    lastUsed: number;
    duration: number;
    use: (tank: Tank) => void;
}

export default Ability