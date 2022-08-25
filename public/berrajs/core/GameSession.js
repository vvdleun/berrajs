import { MutableState } from "./MutableState";

export class GameSession {
    #game;
    #state;
    #running;
    #mutableState;

    constructor(game, state) {
        this.#game = game;
        this.#state = state;
        this.#running = false;
        this.#mutableState = new MutableState(state);
    }

    startNewGame() {
        if(this.#running) {
            throw "Game has already started";
        }

        this.#game.initialize(this.#state);

        this.#compute(this.#game.initTurn());

        this.#running = true;
    }

    #compute(turn) {
        if(turn.isComputed()) {
            throw "Internal error: Turn was already computed!";
        }
        turn.events().forEach(event => {
            event.doEvent(this.#mutableState);
        });
        turn.toggleComputed();
    }

    undo(turn) {
        if(!turn.isComputed()) {
            throw "Internal error: Cannot undo turn that was not computed!";
        }
        turn.events().forEach(event => {
            event.undoEvent(this.#mutableState);
        });
        turn.toggleCobmputed();
    }
}