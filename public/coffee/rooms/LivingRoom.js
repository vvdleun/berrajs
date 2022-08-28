import { Room } from "../../berrajs/core/Room";
import { Exit } from "../../berrajs/objects/Exit";
import { LIVING_ROOM_ID, OUTSIDE_HOUSE_ID } from "./room-ids";

const ID = LIVING_ROOM_ID;

const LEAVE_HOUSE_DIRECTION = "Leave house";

export class LivingRoom extends Room {
    constructor(state) {
        super(ID, state, (objects, stateReader) => {
            objects.push(new Exit("LivingRoom-Exit1", state, LEAVE_HOUSE_DIRECTION, OUTSIDE_HOUSE_ID, ID));
        });
    }

    name() {
        return "Living room (inside house)";
    }

    intro() {
        return "Your smart-lock recognized your phone. You enter your house via the front door and rush yourself to your kitchen.";
    }

    description() {
        return "You are standing in your living room. A coffee machine is sitting on the kitchen's counter.";
    }
}