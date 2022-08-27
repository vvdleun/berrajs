import { Event } from "../core/Event.js";

export class SetActiveRoomEvent extends Event {
    constructor(fromRoomId, toRoomId) {
        super(
            (mutator) => {
                // Do action
                mutator.setActiveRoom(toRoomId);
            },
            (mutator) => {
                // Undo action
                mutator.setActiveRoom(fromRoomId);
            }
        )
    }
    
}