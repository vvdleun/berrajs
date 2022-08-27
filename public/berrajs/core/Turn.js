export class Turn {
    #events = [];
    #computed = false;

    addEvent(event) {
        if(this.#computed) {
            throw "Internal error: Cannot modify turn that was already computed!";
        }
        this.#events.push(event);
    }

    isComputed() {
        return this.#computed;
    }

    toggleComputed() {
        this.#computed = !this.#computed;
    }

    events() {
        return this.#events;
    }
}