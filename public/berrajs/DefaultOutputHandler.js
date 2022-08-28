// Converts output event objects to simple messages and sends those to all subscribed handlers
export class DefaultOutputHandler {
    #outputHandlers = [];

    constructor(outputHandlers) {
        this.#outputHandlers = outputHandlers;
    }

    // Update actions recognized in current's room's state
    updateActions(actions) {
        this.#sendMsg({"event": "updateActions", "value": actions});
    }

    // Update room caption
    updateRoomName(roomName) {
        this.#sendMsg({"event": "updateRoomName", "value": roomName})
    }

    // Print a line, followed by a newline
    printLine(line) {
        this.#sendMsg({"event": "printLine", "value": line });
    }

    // Print a line in bold (without adding a newline)
    printBold(line) {
        this.#sendMsg({"event": "printBold", "value": line});
    }

    // Print a line (without adding a newline)
    print(line) {
        this.#sendMsg({"event": "print", "value": line });
    }

    #sendMsg(msg) {
        this.#outputHandlers.forEach(handler => {
            handler(msg);
        });
    }
}
