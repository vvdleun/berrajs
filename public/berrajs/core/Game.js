import { Turn } from "./Turn";

export class Game {
    #gamePopulator = null;
    id = null;
    title = null;
    rooms = {};            // Maps roomId to room
    objects = {};          // maps objectId to object
    initTurn = null;       // Contains events that initalize the game

    constructor(id, title, gamePopulator) {
        this.id = id;
        this.title = title;
        this.#gamePopulator = gamePopulator;
    }

    initialize(state) {
        const rooms = [];
        const objects = [];
        const initialTurn = new Turn(state);

        this.#gamePopulator(rooms, objects, initialTurn, state);

        this.rooms = this.#toMap(rooms);
        this.objects = this.#toMap(objects);
        this.initTurn = initialTurn;
    }

    #toMap(list) {
        return list.reduce((map, item) => {
            map[item.id] = item;
            return map;
        }, {})        
    }
}