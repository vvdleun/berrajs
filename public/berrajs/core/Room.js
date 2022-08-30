export class Room {
    static localObjectsId = "#objects";

    id = "";
    #objects = [];

    constructor(id) {
        this.id = id;
    }

    initialize(stateReader) {
        this.initializeRoom(stateReader, this.#objects);
    }

    initializeRoom(stateReader, objects) {
        throw "initalizeRoom must be implemented by child class";
    }

    name(stateReader) {
        return "Room without a name";
    }

    intro(stateReader) {
        return null;
    }

    description(stateReader) {
        return "Room without a description";
    }

    enterBefore(stateReader) {
        return false;
    }

    enter(stateReader) {
        return [];
    }

    enterAfter(stateReader) {
        return [];
    }

    objects() {
        return [...this.#objects];
    }
}
 