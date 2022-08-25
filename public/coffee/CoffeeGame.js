import { Game } from "../berrajs/core/Game";
import { SetActiveRoomEvent } from "../berrajs/events/SetActiveRoomEvent";
import { LivingRoom } from "./rooms/LivingRoom";
import { OutsideHouse } from "./rooms/OutsideHouse";
import { LIVING_ROOM_ID } from "./rooms/room-ids";

export class CoffeeGame extends Game {
    static #GAME_TITLE = "Coffee Adventure Game (Powered by Berra.js Adventure Game Engine)";
    static #START_ROOM_ID = LIVING_ROOM_ID;

    constructor() {
        super(CoffeeGame.#GAME_TITLE, (roomPopulators, objectPopulators, turn) => {
            roomPopulators.push(state => new LivingRoom(state));
            roomPopulators.push(state => new OutsideHouse(state));

            turn.addEvent(new SetActiveRoomEvent(null, CoffeeGame.#START_ROOM_ID));
        });
    }
 }