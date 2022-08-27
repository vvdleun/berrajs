import { Event } from "../core/Event";

export class PrintLineEvent extends Event {
    constructor(msg) {
        super(
            (mutableState) => {
                // Do action
                mutableState.showMessage(msg);
                
            },
            (mutableState) => {
                // No undo action for PrintLine...
            }
        )
    }
    
}