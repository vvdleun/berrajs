export class TurnProcessor {
    static compute(turn, mutator) {
        if(turn.isComputed()) {
            throw "Internal error: Turn was already computed!";
        }
        turn.events().forEach(event => {
            event.doEvent(mutator);
        });
        turn.toggleComputed();
    }

    static undo(turn, mutator) {
        if(!turn.isComputed()) {
            throw "Internal error: Cannot undo turn that was not computed!";
        }
        turn.events().forEach(event => {
            event.undoEvent(mutator);
        });
        turn.toggleComputed();
    }
}