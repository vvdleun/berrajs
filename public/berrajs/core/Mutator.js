import { GlobalStateReader } from "../state/StateReaders";
import { GlobalStateWriter } from "../state/StateWriters";

// Only Events are supposed to use this class to manipulate the state
export class Mutator {
    #stateWriter = null;
    #stateReader = null;

    constructor(state) {
        this.#stateMutator = new GlobalStateWriter(state);
        this.#stateReader = new GlobalStateReader(state);
    }
    
    activeRoom() {
        return this.#stateReader.activeRoomId();
    }

    setActiveRoom(roomId) {
        this.#stateWriter.setActiveRoomId(roomId);
    }

    score() {
        return this.#stateReader.score();
    }

    setScore(points) {
        this.#stateWriter.setScore(points);
    }

    printLine(msg) {
        // Need to be implemented by child class
        throw "showMessage is not implemented by child class";
    }
}