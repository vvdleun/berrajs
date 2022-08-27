import { MutableState } from "./MutableState";

/** 
 * An active gaming session.
 * The front-end communicates with the GameSession object by providing InputAction objects.
 * The session searches for the object that must handle the action, call the appropiate object's methods
 * and the session will collect the events and compute the turn. It will fire a callback, that the front-end
 * can use to update the visual state.
 */
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

        this.#compute(this.#game.initTurn);

        this.#running = true;
    }

    stopGame() {
        if(!this.#running) {
            throw "Game has already stopped";
        }
        this.#running = false;
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

    #undo(turn) {
        if(!turn.isComputed()) {
            throw "Internal error: Cannot undo turn that was not computed!";
        }
        turn.events().forEach(event => {
            event.undoEvent(this.#mutableState);
        });
        turn.toggleComputed();
    }
}