export class TurnProcessor {
    static compute(turn, stateWriter, outputHandler) {
        if(turn.isComputed()) {
            throw "Internal error: Turn was already computed!";
        }
        turn.events().forEach(event => {
            event.doEvent(stateWriter, outputHandler);
        });
        turn.toggleComputed();
    }

    static undo(turn, stateWriter, outputHandler) {
        if(!turn.isComputed()) {
            throw "Internal error: Cannot undo turn that was not computed!";
        }
        turn.events().forEach(event => {
            event.undoEvent(stateWriter, outputHandler);
        });
        turn.toggleComputed();
    }
}