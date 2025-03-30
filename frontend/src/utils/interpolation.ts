import { Entity } from "../interface/Entity";

export function interpolateEntities<T extends Entity>(
    current: Record<string, T>,
    previous: Record<string, T>,
    lastUpdateTime: number
): Record<string, T> {
    const interpolated: Record<string, T> = {};
    const now = performance.now();
    const deltaTime = Math.min((now - lastUpdateTime) / 100, 1); // Normalize time

    Object.keys(current).forEach((id) => {
        const prev = previous[id] || current[id];

        interpolated[id] = {
            ...current[id], // Preserve all properties
            x: prev.position.x + (current[id].position.x - prev.position.x) * deltaTime,
            y: prev.position.y + (current[id].position.y - prev.position.y) * deltaTime,
            rotation:
                prev.rotation +
                ((current[id].rotation - prev.rotation + 180) % 360 - 180) * deltaTime,
        };
    });

    return interpolated;
}
