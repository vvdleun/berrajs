import { GameSession } from "./core/GameSession.js";
import { DefaultOutputHandler } from "./DefaultOutputHandler.js";

// The Berra.js engine is written in vanilla JavaScript code and is, by design, totally UI-front-end technology agnostic.
// It outputs event messages, that the front-end is supposed to process. The front-end sends input messages to the
// gaming session object that the engine returns. 
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