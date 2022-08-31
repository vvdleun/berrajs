import { GlobalStateReader } from "./impl/StateReader";

// Context data should be considered read-only
// TODO: refactor this mess, too many objects are involved.
export class Context {
    #game
    stateReader

    constructor(state, game) {
        this.stateReader = new GlobalStateReader(state);
        this.#game = game;
    }

    room(id) {
        if(!id) {
            id = this.stateReader.roomId();
        }
        return this.#game.rooms[id];
    }

    rooms() {
        return this.#game.rooms;
    }

    objects() {
        return this.#game.objects;
    }    
}