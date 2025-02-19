interface Buff<T extends Entity> {
    name: string;
    duration: number | null; // Duration in milliseconds, null = permanent
    apply(target: T): void;
    remove(target: T): void;
}