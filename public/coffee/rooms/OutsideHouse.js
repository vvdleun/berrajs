import { Room } from "../../berrajs/core/Room";
import { Exit } from "../../berrajs/objects/Exit";
import { StaticObject } from "../../berrajs/objects/StaticObject";
import { LIVING_ROOM_ID, OUTSIDE_HOUSE_ID } from "./room-ids";

const ID = OUTSIDE_HOUSE_ID;

const ENTER_HOUSE_DIRECTION = "Enter house";

export class OutsideHouse extends Room {
    constructor() {
        super(ID);
    }

    initializeRoom(stateReader, objects) {
        objects.push(new Exit("OutsideHouse-Exit1", ENTER_HOUSE_DIRECTION, LIVING_ROOM_ID, ID));
        objects.push(new StaticObject("OutsideHouse-House", "House", "You recently installed a smart lock on your front door. That may be part of a puzzle that is not implemented yet... :-)"));
        objects.push(new StaticObject("OutsideHouse-Sign", "Sign", "It says: \"This game is powered by the Berra.js adventure game system, written by Vincent van der Leun.\". \"Good to know\", you think by yourself."));
    }

    name(stateReader) {
        return "Outside house";
    }

    intro(stateReader) {
        return "You are standing outside your house. There is a sign here.";
    }

    description(stateReader) {
        return "You are outside your house.";
    }
}