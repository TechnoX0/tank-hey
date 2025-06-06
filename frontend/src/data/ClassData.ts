interface ClassData {
    ability_name: string;
    ability_description: string;
    hp: number;
    attack: number;
    attack_speed: number;
    speed: number;
}

const TankClasses: Record<string, ClassData> = {
    juggernaut: {
        ability_name: "Full Impact",
        ability_description:
            "Increases projectile size and impact area, allowing your attacks to hit a wider range of targets for a limited time.",
        hp: 40,
        attack: 10,
        attack_speed: 2,
        speed: 1,
    },
    sniper: {
        ability_name: "Iron Focus",
        ability_description:
            "Grants temporary invulnerability while enhancing your damage output, letting you strike with precision and power without interruption",
        hp: 10,
        attack: 10,
        attack_speed: 1,
        speed: 2,
    },
    scout: {
        ability_name: "Ghost Step",
        ability_description:
            "Grants temporary invisibility and increases movement speed, allowing you to move unseen and quickly reposition.",
        hp: 25,
        attack: 3,
        attack_speed: 0.4,
        speed: 4,
    },
    allrounder: {
        ability_name: "Fortess",
        ability_description:
            "Generates a protective shield that absorbs incoming damage for a short duration, enhancing your survivability.",
        hp: 30,
        attack: 5,
        attack_speed: 0.1,
        speed: 3,
    },
};

export { TankClasses };
