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

    name(context) {
        return "Room without a name";
    }

    intro(context) {
        return null;
    }

    description(context) {
        return "Room without a description";
    }

    enterBefore(context) {
        return false;
    }

    enter(context) {
        return [];
    }

    enterAfter(context) {
        return [];
    }

    objects() {
        return [...this.#objects];
    }
}
 