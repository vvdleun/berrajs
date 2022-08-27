import { Game } from "../berrajs/core/Game";
import { SetActiveRoomEvent } from "../berrajs/events/SetActiveRoomEvent";
import { LivingRoom } from "./rooms/LivingRoom";
import { OutsideHouse } from "./rooms/OutsideHouse";
import { LIVING_ROOM_ID } from "./rooms/room-ids";

const GAME_ID = "cofv1";
const GAME_TITLE = "Coffee - The Adventure Game";
const START_ROOM_ID = LIVING_ROOM_ID;

export class CoffeeGame extends Game {
    constructor() {
        super(GAME_ID, GAME_TITLE, (rooms, objects, initialTurn, state) => {
            rooms.push(new LivingRoom(state));
            rooms.push(new OutsideHouse(state));

            initialTurn.addEvent(new SetActiveRoomEvent(null, START_ROOM_ID));
        });
    }
 }