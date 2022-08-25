import { Turn } from "./Turn";

export class Game {
    #name = null;
    #gamePopulator = null;
    #rooms = {};            // Maps roomId to room
    #objects = {};          // maps objectId to object
    #initTurn = null;       // Contains events that initalize the game

    constructor(name, gamePopulator) {
        this.#name = name;
        this.#gamePopulator = gamePopulator;
    }

    initialize(state) {
        const roomPopulators = [];
        const objectPopulators = [];
        const initTurn = new Turn(state);

        this.#gamePopulator(roomPopulators, objectPopulators, initTurn);

        // TODO Trying too hard to not leak state, while still leaking state
        const rooms = roomPopulators
            .map(roomPopulator => roomPopulator(state));
        const objects = objectPopulators
            .map(objectsPopulator => objectsPopulator(state));

        this.#rooms = this.#toMap(rooms);
        this.#objects = this.#toMap(objects);
        this.#initTurn = initTurn;
    }

    #toMap(list) {
        return list.reduce((map, item) => {
            map[item.id] = item;
            return map;
        }, {})        
    }

    name() {
        return this.#name;
    }

    rooms() {
        return this.#rooms;
    }

    objects() {
        return this.#objects;
    }

    state() {
        return this.#state;
    }

    initTurn() {
        return this.#initTurn;
    }
}