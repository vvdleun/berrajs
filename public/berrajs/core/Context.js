import { GlobalStateReader } from "./impl/StateReaders";

// Context data should be considered read-only
// TODO: refactor this mess, too many objects are involved.
export class Context {
    #game
    stateReader

    constructor(state, game) {
        this.stateReader = new GlobalStateReader(state);
        this.#game = game;
    }

    rooms() {
        return this.#game.rooms;
    }

    objects() {
        return this.#game.objects;
    }    
}