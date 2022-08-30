import { Event } from "../core/Event";

export class PrintBoldEvent extends Event {
    constructor(line) {
        super(
            (stateWriter, outputHandler, context) => {
                // Do action
                outputHandler.printBold(line);
            },
            (stateWriter, outputHandler, context) => {
                // No undo action for PrintLine...
            }
        )
    }
    
}