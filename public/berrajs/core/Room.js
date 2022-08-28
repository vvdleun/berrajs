import { StateReader } from "./impl/StateReaders";

export class Room {
    static localObjectsId = "#objects";

    id = "";
    #stateReader;
    #objects = [];

    constructor(id, state, roomPopulator) {
        this.id = id;
        this.#stateReader = new StateReader(state, id);
        roomPopulator(this.#objects, this.#stateReader);
    }

    name() {
        return "Room without a name";
    }

    intro() {
        return "";
    }

    description() {
        return "Room without a description";
    }

    enterBefore() {
        return false;
    }

    enter() {
        return [];
    }

    enterAfter() {
        return [];
    }

    objects() {
        return [...this.#objects];
    }
}
 