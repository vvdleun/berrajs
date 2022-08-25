import { Event } from "../core/Event";

export class SetActiveRoomEvent extends Event {
    constructor(fromRoomId, toRoomId) {
        super(
            (mutableState) => {
                // Do action
                mutableState.setActiveRoom(toRoomId);
            },
            (mutableState) => {
                // Undo action
                mutableState.setActiveRoom(fromRoomId);
            }
        )
    }
    
}