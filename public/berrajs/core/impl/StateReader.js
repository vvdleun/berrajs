export class GlobalStateReader {
    state;

    constructor(state) {
        this.state = state;
    }

    roomId() {
        return this.state.roomId;
    }

    score() {
        return this.state.score;
    }

    roomState(id, key) {
        const roomState = this.state.rooms[id];
        if(!key) {
            return roomState;
        }
        return roomState[key];
    }

    objectState(id, key) {
        const objectState = this.state.objects[id];
        if(!key) {
            return objectState;
        }
        return objectState[key];
    }
}

