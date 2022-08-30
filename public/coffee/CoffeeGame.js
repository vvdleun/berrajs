import { Game } from "../berrajs/core/Game";
import { PrintBoldEvent } from "../berrajs/events/PrintBoldEvent";
import { PrintEvent } from "../berrajs/events/PrintEvent";
import { PrintLineEvent } from "../berrajs/events/PrintLineEvent";
import { SetActiveRoomEvent } from "../berrajs/events/SetActiveRoomEvent";
import { LivingRoom } from "./rooms/LivingRoom";
import { OutsideHouse } from "./rooms/OutsideHouse";

const GAME_ID = "coffee1-v1";
const GAME_TITLE = "Coffee - The Adventure Game";

export class CoffeeGame extends Game {
    constructor() {
        super(GAME_ID, GAME_TITLE);
    }

    initializeGame(rooms, objects, initialTurn, stateReader) {
        const startRoom = new OutsideHouse();

        rooms.push(startRoom);
        rooms.push(new LivingRoom());

        initialTurn.addEvent(new SetActiveRoomEvent(startRoom.id));
        initialTurn.addEvent(new PrintEvent("Welcome to "));
        initialTurn.addEvent(new PrintBoldEvent(GAME_TITLE));
        initialTurn.addEvent(new PrintLineEvent("!"));
        initialTurn.addEvent(new PrintEvent("This is a small game, that mainly exists to debug the engine, that was developed at the same time. "
                + "It was heavily inspired by a small Dutch late '80s classical graphical adventure game, called \""));
        initialTurn.addEvent(new PrintBoldEvent("Koffie"));
        initialTurn.addEvent(new PrintLineEvent("\", which appeared in 1988 and later that year was improved greatly upon with the release of version 2."));
        initialTurn.addEvent(new PrintEvent("This game is dedicated to the original authors: "));
        initialTurn.addEvent(new PrintBoldEvent("J.A.M. Kleijn"));
        initialTurn.addEvent(new PrintEvent(" (programmer) and "));
        initialTurn.addEvent(new PrintBoldEvent("W. van Heerebeek"));
        initialTurn.addEvent(new PrintLineEvent(" (graphical artist for version 2)."));
        initialTurn.addEvent(new PrintLineEvent("Now your adventure begins."));
        initialTurn.addEvent(new PrintLineEvent("After a long stressing day you are finally home. Dying, figuratively speaking, for a nice cup of coffee."));
        initialTurn.addEvent(new PrintLineEvent(startRoom.intro(stateReader)));
    };
 }