import { GameObject } from "../core/BerraObject.js";
import { ACTION_EXAMINE_ID, ACTION_NAMES } from "../core/impl/actionIds.js";
import { PrintBoldEvent } from "../events/PrintBoldEvent.js";
import { PrintLineEvent } from "../events/PrintLineEvent.js";

export class StaticObject extends GameObject {
    #name;
    #examineMsg

    constructor(id, name, examineMsg) {
        super(id);
        this.#name = name;
        this.#examineMsg = examineMsg;
    }

    name(context) {
        return this.#name;
    }

    examinable(context) {
        return true;
    }

    examineBefore(context) {
        return [];
    }

    examine(context) {
        return [ 
            new PrintBoldEvent("> " + ACTION_NAMES[ACTION_EXAMINE_ID].toUpperCase() + " " +  this.#name.toUpperCase()),
            new PrintLineEvent(""),
            new PrintLineEvent(this.#examineMsg) ];
    }

    examineAfter(context) {
        return [];
    }
}
