// Only events are supposed to manipulate the state, using this class
export class MutableState {
    state = null;

    constructor(state) {
        this.state = state;
    }
    
    activeRoom() {
        return this.state.roomId;
    }

    setActiveRoom(roomId) {
        this.state.roomId = roomId;
    }

    score() {
        return this.state.score;
    }

    setScore(points) {
        this.state.score = points;
    }

    showMessage(msg) {
        // Need to be implemented by child class
        throw "showMessage is not implemented by child class";
    }
}