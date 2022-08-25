export class GlobalStateaReader {
    state;

    constructor(state) {
        this.state = state;
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

export class StateReader extends GlobalStateaReader {
    id;

    constructor(state, id) {
        super(state);
        this.id = id;
    }

    hasLocalRoomState(key) {
        const localState = this.allLocalRoomState();
        return localState && key in localState; 
    }

    localRoomState(key) {
        return this.getAllLocalRoomState()[key];
    }

    allLocalRoomState() {
        return this.getRoomState(this.id);
    }

    hasLocalObjectState(key) {
        const localState = this.allLocalObjectState();
        return localState && key in localState; 
    }

    getLocalObjectState(key) {
        return this.getAllLocalObjectState()[key];
    }

    getAllLocalObjectState() {
        return this.getObjectState(this.id);
    }
}