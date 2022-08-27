import { GameSession } from "./core/GameSession.js";
import { OutputHandler } from "./OutputHandler";

// Routes output events to all subscribed handlers 
class OutputHandlerRouter extends OutputHandler {
    #outputHandlers = [];

    constructor(outputHandlers) {
        super();
        this.#outputHandlers = outputHandlers;
    }

    printLine(line) {
        this.#routeToSubscribers(h => h({ "event": "printLine", "value": line }));
    }

    printBold(line) {
        this.#routeToSubscribers(h => h({ "event": "printBold", "value": line }));
    }

    print(line) {
        this.#routeToSubscribers(h => h({ "event": "print", "value": line }));
    }

    updateActions(actions) {
        this.#routeToSubscribers(h => h({ "event": "updateActions", "value": actions }));
    }

    #routeToSubscribers(cb) {
        this.#outputHandlers.forEach(h => {
            cb(h);
        });
    }
}

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
        const outputHandler = new OutputHandlerRouter(this.#outputHandlers);

        const session = new GameSession(game, outputHandler);

        session.resetGame();

        return session;
    }
} 