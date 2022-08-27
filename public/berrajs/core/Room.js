import { StateReader } from "../state/StateReaders";

export class Room {
    static localObjectsId = "#objects";

    id = "";
    #stateReader;
    #objects = [];

    constructor(id, state, objectPopulator) {
        this.id = id;
        this.#stateReader = new StateReader(state, id);
        objectPopulator(this.#objects, this.#stateReader);
    }

    name() {
        return "Room without a name";
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
        if(this.#stateReader.hasLocalRoomState(Room.localObjectsId)) {
            return this.#stateReader.localRoomState(Room.localObjectsId);
        }
        return [...this.#objects];
    }
}
 