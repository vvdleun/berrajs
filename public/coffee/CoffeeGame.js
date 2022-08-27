import { Game } from "../berrajs/core/Game";
import { PrintBoldEvent } from "../berrajs/events/PrintBoldEvent";
import { PrintEvent } from "../berrajs/events/PrintEvent";
import { PrintLineEvent } from "../berrajs/events/PrintLineEvent";
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
            initialTurn.addEvent(new PrintEvent("Welcome to the "));
            initialTurn.addEvent(new PrintBoldEvent("Coffee"));
            initialTurn.addEvent(new PrintLineEvent(" game!"));
            initialTurn.addEvent(new PrintLineEvent("This is a small game to demonstrate and develop/debug the Berra.js adventure game engine."));
            initialTurn.addEvent(new PrintEvent("It was heavily inspired by a small Dutch graphical adventure game, called \""));
            initialTurn.addEvent(new PrintBoldEvent("Koffie"));
            initialTurn.addEvent(new PrintLineEvent("\", which featured a text parser and was written in Turbo Pascal for DOS and published in 1988. First a public domain CGA "
                    + "version was released, and later that year the sequel and a more impressive EGA version was released, now as shareware. Both versions came with the source code. "
                    + "As a Sierra On-Line fan and budding Turbo Pascal programmer, back in the day, I was rather impressed."));
            initialTurn.addEvent(new PrintEvent("This game is tributed to the original authors: programmer "));
            initialTurn.addEvent(new PrintBoldEvent("J.A.M. Kleijn"));
            initialTurn.addEvent(new PrintEvent(" (living in Rotterdam at that time) and graphical artist "));
            initialTurn.addEvent(new PrintBoldEvent("W. van Heerebeek"));
            initialTurn.addEvent(new PrintLineEvent(" (for the EGA version)."));
        });
    }
 }