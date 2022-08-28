import { Turn } from "./Turn";

export class Game {
    id = null;
    title = null;
    rooms = {};            // Maps roomId to room
    objects = {};          // maps objectId to object
    initTurn = null;       // Contains events that initalize the game

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    initialize(state) {
        const rooms = [];
        const objects = [];
        const initialTurn = new Turn(state);

        this.loadGame(rooms, objects, initialTurn, state);

        this.rooms = this.#toMap(rooms);
        this.objects = this.#toMap(objects);
        this.initTurn = initialTurn;
    }

    loadGame(rooms, objects, initialTurn, state) {
        throw "This method must be implemented in the game";
    }

    #toMap(list) {
        return list.reduce((map, item) => {
            map[item.id] = item;
            return map;
        }, {})        
    }
}