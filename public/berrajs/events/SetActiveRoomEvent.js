import { Event } from "../core/Event.js";

export class SetActiveRoomEvent extends Event {
    constructor(toRoomId, fromRoomId) {
        super(
            (stateWriter, outputHandler, context) => {
                // Do action
                stateWriter.setActiveRoomId(toRoomId);
            },
            (stateWriter, outputHandler, context) => {
                // Undo action
                if(!fromId) {
                    throw "Cannot undo setActiveRoomEvent: fromRoomId was not specified";
                }
                stateWriter.setActiveRoomId(fromRoomId);
            }
        )
    }
    
}