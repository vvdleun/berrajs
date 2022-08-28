import { SetActiveRoomEvent } from "../events/SetActiveRoomEvent.js";
import { GameObject } from "../core/BerraObject.js";
import { PrintRoomIntroEvent } from "../events/PrintRoomIntroEvent.js";
import { PrintLineEvent } from "../events/PrintLineEvent.js";
import { PrintBoldEvent } from "../events/PrintBoldEvent.js";

// Default directions
export const NORTH = "North";
export const NORTH_EAST = "North-east";
export const EAST = "East";
export const SOUTH_EAST = "South-east";
export const SOUTH = "South";
export const SOUTH_WEST = "South-west";
export const WEST = "West";
export const NORTH_WEST = "North-West";

export class Exit extends GameObject {
    #direction = null;
    #toRoomId = null;
    #fromRoomId = null;

    constructor(id, state, direction, toRoomId, fromRoomId) {
        super(id, state);
        this.#direction = direction;
        this.#toRoomId = toRoomId;
        this.#fromRoomId = fromRoomId;
    }

    name() {
        return this.#direction;
    }

    walkable() {
        return true;
    }

    walk() {
       return [
        new PrintBoldEvent("> " + this.#direction.toUpperCase()),
        new PrintLineEvent(""),
        new SetActiveRoomEvent(this.#fromRoomId, this.#toRoomId),
        new PrintRoomIntroEvent(this.#toRoomId)
      ];
    }
}
