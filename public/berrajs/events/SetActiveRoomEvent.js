import { Event } from "../core/Event.js";

export class SetActiveRoomEvent extends Event {
    constructor(fromRoomId, toRoomId) {
        super(
            (stateWriter, outputHandler) => {
                // Do action
                stateWriter.setActiveRoomId(toRoomId);
            },
            (stateWriter, outputHandler) => {
                // Undo action
                stateWriter.setActiveRoomId(fromRoomId);
            }
        )
    }
    
}