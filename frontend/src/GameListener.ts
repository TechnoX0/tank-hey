type KeyAction = {
    onPress?: () => void;  // Triggered once when key is pressed
    onHold?: () => void;   // Triggered continuously while key is held
    onRelease?: () => void; // Triggered when key is released
};

class GameListener {
    private keys: Record<string, boolean> = {};
    private actions: Record<string, KeyAction> = {};

    constructor() {
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    start() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
        this.loop();
    }

    stop() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (!this.keys[event.code]) {
            this.keys[event.code] = true;

            // Trigger press event (only once per press)
            if (this.actions[event.code]?.onPress) {
                this.actions[event.code].onPress!();
            }
        }
    }

    private handleKeyUp(event: KeyboardEvent) {
        if (this.keys[event.code]) {
            this.keys[event.code] = false;

            // Trigger release event
            if (this.actions[event.code]?.onRelease) {
                this.actions[event.code].onRelease!();
            }
        }
    }

    private loop() {
        Object.keys(this.keys).forEach((key) => {
            if (this.keys[key] && this.actions[key]?.onHold) {
                this.actions[key].onHold!(); // Trigger hold action continuously
            }
        });

        requestAnimationFrame(() => this.loop());
    }

    addAction(key: string, action: KeyAction) {
        this.actions[key] = action;
    }

    removeAction(key: string) {
        delete this.actions[key];
    }
}

export default GameListener;
