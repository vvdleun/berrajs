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
        return this.allRoomState(id)[key];
    }

    allRoomState(id) {
        return this.state.rooms[id];
    }

    objectState(id, key) {
        return this.allObjectState(id)[key];
    }

    allObjectState(id) {
        return this.state.objects[id];
    }
}

