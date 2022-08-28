import { Room } from "../../berrajs/core/Room";
import { Exit } from "../../berrajs/objects/Exit";
import { LIVING_ROOM_ID, OUTSIDE_HOUSE_ID } from "./room-ids";

const ID = OUTSIDE_HOUSE_ID;

const ENTER_HOUSE_DIRECTION = "Enter house";

export class OutsideHouse extends Room {
    constructor(state) {
        super(ID, state, (objects, stateReader) => {
            objects.push(new Exit("OutsideHouse-Exit1", state, ENTER_HOUSE_DIRECTION, LIVING_ROOM_ID, ID));
        });
    }

    name() {
        return "Outside house";
    }

    intro() {
        return "You are standing outside your house. Currently the developer only added an exit to enter the house, so it is quite boring!";
    }

    description() {
        return "You are outside your house.";
    }
}