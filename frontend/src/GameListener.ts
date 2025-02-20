type KeyAction = (isPressed: boolean) => void;

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
        this.keys[event.code] = true; // Just mark the key as pressed
    }

    private handleKeyUp(event: KeyboardEvent) {
        if (this.keys[event.code]) {
            this.keys[event.code] = false;
            this.triggerAction(event.code, false);
        }
    }

    private triggerAction(key: string, isPressed: boolean) {
        if (this.actions[key]) {
            this.actions[key](isPressed);
        }
    }

    addAction(key: string, action: KeyAction) {
        this.actions[key] = action;
    }

    removeAction(key: string) {
        delete this.actions[key];
    }

    private loop() {
        Object.keys(this.keys).forEach((key) => {
            if (this.keys[key] && this.actions[key]) {
                this.actions[key](true); // Continuously trigger action if key is held
            }
        });
    
        requestAnimationFrame(() => this.loop());
    }
}

export default GameListener;
