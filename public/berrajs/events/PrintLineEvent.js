import { Event } from "../core/Event";

export class PrintLineEvent extends Event {
    constructor(line) {
        super(
            (stateWriter, outputHandler) => {
                // Do action
                outputHandler.printLine(line);
            },
            (stateWriter, outputHandler) => {
                // No undo action for PrintLine...
            }
        )
    }
    
}