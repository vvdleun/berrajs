import { Room } from "../../berrajs/core/Room";
import { Exit, SOUTH } from "../../berrajs/objects/Exit";
import { LIVING_ROOM_ID, OUTSIDE_HOUSE_ID } from "./room-ids";

const ID = LIVING_ROOM_ID;

export class LivingRoom extends Room {
    constructor(state) {
        super(ID, state, (objects, stateReader) => {
            objects.push(new Exit("LivingRoom-Exit1", state, SOUTH, OUTSIDE_HOUSE_ID, ID));
        });
    }

    name() {
        return "Living room (inside house)";
    }

    description() {
        return "You are standing in your living room. A coffee machine is sitting on the kitchen's counter.";
    }
}