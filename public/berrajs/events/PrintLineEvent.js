import { Event } from "../core/Event";

export class PrintLineEvent extends Event {
    constructor(line) {
        super(
            (stateWriter, outputHandler, context) => {
                // Do action
                outputHandler.printLine(line);
            },
            (stateWriter, outputHandler, context) => {
                // No undo action for PrintLine...
            }
        )
    }
    
}