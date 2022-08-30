import { Event } from "../core/Event";

export class PrintEvent extends Event {
    constructor(line) {
        super(
            (stateWriter, outputHandler, context) => {
                // Do action
                outputHandler.print(line);
            },
            (stateWriter, outputHandler, context) => {
                // No undo action for PrintLine...
            }
        )
    }
    
}