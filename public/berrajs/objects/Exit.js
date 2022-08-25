import { SetActiveRoomEvent } from "../events/SetActiveRoomEvent";
import { GameObject } from "./BerraObject";

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

    constructor(direction, toRoomId, fromRoomId) {
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
       return [new SetActiveRoomEvent(this.#fromRoomId, this.#toRoomId)];
    }
}