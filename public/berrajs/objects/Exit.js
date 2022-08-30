import { SetActiveRoomEvent } from "../events/SetActiveRoomEvent.js";
import { GameObject } from "../core/BerraObject.js";
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

    constructor(id, direction, toRoomId, fromRoomId) {
        super(id);
        this.#direction = direction;
        this.#toRoomId = toRoomId;
        this.#fromRoomId = fromRoomId;
    }

    name(context) {
        return this.#direction;
    }

    walkable(context) {
        return true;
    }

    walk(context) {
        const events = [
            new PrintBoldEvent("> " + this.#direction.toUpperCase()),
            new PrintLineEvent(""),
            new SetActiveRoomEvent(this.#toRoomId, this.#fromRoomId),
        ];

        const introToRoom = context.rooms()[this.#toRoomId].intro(context);
        if(introToRoom) {
            events.push(new PrintLineEvent(introToRoom));
        }

        return events;
    }
}
