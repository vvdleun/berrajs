import { Room } from "../../berrajs/core/Room";
import { Exit, NORTH } from "../../berrajs/objects/Exit";
import { LIVING_ROOM_ID, OUTSIDE_HOUSE_ID } from "./room-ids";

const ID = OUTSIDE_HOUSE_ID;

export class OutsideHouse extends Room {
    constructor(state) {
        super(ID, state, (objects, stateReader) => {
            objects.push(new Exit("OutsideHouse-Exit1", state, NORTH, LIVING_ROOM_ID, ID));
        });
    }

    name() {
        return "Outside house";
    }

    description() {
        return "You are outside your house.";
    }
}