import { Room } from "../../berrajs/core/Room";
import { Exit, NORTH } from "../../berrajs/objects/Exit";
import { LIVING_ROOM_ID, OUTSIDE_HOUSE_ID } from "./room-ids";

export class OutsideHouse extends Room {

    constructor(state) {
        super(OUTSIDE_HOUSE_ID, state, (objects, stateReader) => {
            objects.push(new Exit(NORTH, LIVING_ROOM_ID, this.id));
        });
    }

    name() {
        return "Outside house";
    }

    description() {
        return "You are outside your house.";
    }
}