export class Event {
    doEvent = null;
    undoEvent = null;
    
    constructor(doEvent, undoEvent) {
        this.doEvent = doEvent;
        this.undoEvent = undoEvent;
    }
}