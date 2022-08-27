export class GlobalStateWriter {
    #state;

    constructor(state) {
        this.#state = state;
    }

    setActiveRoomId(roomId) {
        this.state.roomId = roomId;
    }

    setScore(points) {
        this.state.score = points;
    }
}