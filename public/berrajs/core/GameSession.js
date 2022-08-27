import { RoomActionCollector } from "./impl/RoomActionCollector";
import { StateInitializer } from "./impl/StateInitializer";
import { GlobalStateReader } from "./impl/StateReaders";
import { GlobalStateWriter } from "./impl/StateWriters";
import { TurnProcessor } from "./impl/TurnProcessor";

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
    #stateReader;
    #stateWriter;
    #running = false;
    #outputHandler = null;

    constructor(game, outputHandler) {
        this.#game = game;
        this.#outputHandler = outputHandler;
    }

    resetGame() {
        if(this.#running) {
            throw "Game has already started";
        }

        const state = StateInitializer.createNewState();

        // Bad design alarm: mutates properties of this class!
        this.#running = false;
        this.#stateReader = new GlobalStateReader(state);
        this.#stateWriter = new GlobalStateWriter(state);

        this.#game.initialize(state);

        this.#compute(this.#game.initTurn);

        this.#running = true;
    }

    pauseGame() {
        if(!this.#running) {
            throw "Game is not running, cannot pause game";
        }

        // It is a turn-based engine, so assume there are no timers for now :-)
        this.#running = false;
    }

    continueGame() {
        if(this.#running) {
            throw "Game is already running, cannot unpause game";
        }

        this.#running = true;
    }

    stopGame() {
        if(!this.#running) {
            throw "Game was already stopped";
        }

        this.#running = false;
    }

    #compute(turn) {
        TurnProcessor.compute(turn, this.#stateWriter, this.#outputHandler);
        this.#updateActions();
    }

    #undo(turn) {
        TurnProcessor.undo(turn, this.#stateWriter, this.#outputHandler);
        this.#updateActions();
    }

    #updateActions() {
        // Inform subscribers of the available actions in the current room's current state
        const roomId = this.#stateReader.roomId();
        const room = this.#game.rooms[roomId];

        const actions = RoomActionCollector.collectSupportedActionsPerObject(room);

        this.#outputHandler.updateActions(actions);
    }
}