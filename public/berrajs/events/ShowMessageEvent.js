import { Event } from "../core/Event";

export class ShowMessageEvent extends Event {
    constructor(msg) {
        super(
            (mutableState) => {
                // Do action
                mutableState.showMessage(msg);
                
            },
            (mutableState) => {
                // No undo action
            }
        )
    }
    
}