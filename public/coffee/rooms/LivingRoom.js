import { Room } from "../../berrajs/core/Room";
import { Exit, SOUTH } from "../../berrajs/objects/Exit";
import { LIVING_ROOM_ID, OUTSIDE_HOUSE_ID } from "./room-ids";

export class LivingRoom extends Room {
    constructor(state) {
        super(LIVING_ROOM_ID, state, (objects, stateReader) => {
            objects.push(new Exit(SOUTH, OUTSIDE_HOUSE_ID, this.id));
        });
    }

    name() {
        return "Living room (inside house)";
    }

    description() {
        return "You are standing in your living room. A coffee machine is sitting on the kitchen's counter.";
    }
}