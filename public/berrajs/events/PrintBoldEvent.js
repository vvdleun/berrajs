import { Event } from "../core/Event";

export class PrintBoldEvent extends Event {
    constructor(line) {
        super(
            (stateWriter, outputHandler) => {
                // Do action
                outputHandler.printBold(line);
            },
            (stateWriter, outputHandler) => {
                // No undo action for PrintLine...
            }
        )
    }
    
}