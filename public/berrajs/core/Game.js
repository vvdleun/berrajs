import { Turn } from "./Turn";

export class Game {
    id = null;
    title = null;
    rooms = {};            // Maps room.id to Room object
    objects = {};          // maps object.id to BerraObject object
    initTurn = null;       // Contains events that are used to initalize the game

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    initialize(stateReader) {
        const rooms = [];
        const objects = [];
        const initialTurn = new Turn();

        this.initializeGame(rooms, objects, initialTurn, stateReader);

        // Initalize rooms
        // TODO initalize objects the same way
        rooms.forEach(room => room.initialize(stateReader));

        this.rooms = this.#toMap(rooms);
        this.objects = this.#toMap(objects);
        this.initTurn = initialTurn;          
    }

    initializeGame(rooms, objects, initialTurn, stateReader) {
        throw "This method must be implemented in the game";
    }

     #toMap(list) {
        return list.reduce((map, item) => {
            map[item.id] = item;
            return map;
        }, {})        
    }
}