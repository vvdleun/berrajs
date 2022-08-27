import { RoomActionCollector } from "./impl/RoomActionCollector";
import { TurnProcessor } from "./impl/TurnProcessor";
import { Mutator } from "./Mutator";

/** 
 * An active gaming session: the bridge between the front-end and the gaming engine.
 * 
 * The front-end communicates with the GameSession object by providing InputAction objects.
 * The session searches for the object that must handle the action, call the appropiate object's methods
 * and the session will collect the events and compute the turn. It will fire a callback, that the front-end
 * can subscribe to update the visual state.
 */
export class GameSession {
    #game;
    #state;
    #mutator;
    #running = false;
    #actionListeners = [];

    constructor(game) {
        this.#game = game;

        const state = StateInitializer.createNewState();

        this.#state = state;
        this.#mutator = new Mutator(state);
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
            throw "Game was already stopped";
        }
        this.#running = false;
    }

    #compute(turn) {
        TurnProcessor.compute(turn, this.#mutator);
        this.#updateActions();
    }

    #undo(turn) {
        TurnProcessor.undo(turn, this.#mutator);
        this.#updateActions();
    }

    #updateActions() {
        // Inform subscribers of the available actions in the current room's current state
        const roomId = this.#mutator.activeRoom();
        const room = this.#game.rooms[roomId];

        const actions = RoomActionCollector.collectSupportedActionsPerObject(room);

        this.#actionListeners.forEach(subscriber => subscriber(actions));
    }

    subscribeActionListener(subscriber) {
        this.#actionListeners.push(subscriber);
    }

    unsubscribeActionListener(subscriber) {
        this.#actionListeners = this.#actionListeners
            .filter(s => s !== subscriber);
    }
}