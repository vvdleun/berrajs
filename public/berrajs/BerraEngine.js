import { GameSession } from "./core/GameSession.js";
import { DefaultOutputHandler } from "./DefaultOutputHandler.js";

// The Berra.js engine is written in vanilla JavaScript code and is, by design, UI-front-end technology agnostic.
export class BerraEngine {
    #outputHandlers = [];

    subscribeOutputHandler(handler) {
        this.#outputHandlers.push(handler);
    }

    unsubscribeOutputHandler(handler) {
        this.#outputHandlers = this.#outputHandlers
            .filter(h => h !== handler)
    }
    
    start(game) {
        const outputHandler = new DefaultOutputHandler(this.#outputHandlers);

        const session = new GameSession(game, outputHandler);

        session.resetGame();

        return session;
    }
} 