import { Event } from "../core/Event";

export class PrintEvent extends Event {
    constructor(line) {
        super(
            (stateWriter, outputHandler) => {
                // Do action
                outputHandler.print(line);
            },
            (stateWriter, outputHandler) => {
                // No undo action for PrintLine...
            }
        )
    }
    
}