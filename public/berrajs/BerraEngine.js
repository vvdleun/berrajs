import { GameSession } from "./core/GameSession.js";

export class BerraEngine {
    static start(game) {
        const state = {
            "version": 0,       // Version of this structure
            "score": 0,         // Current score
            "rooms": {},        // State of individual rooms (if room manipulates state)
            "objects": {},      // State of individual objects (if object manipulates state)
            "roomId": null      // Active room
        }

        const session = new GameSession(game, state);
        session.startNewGame();

        return session;
    }


    // static start(game) {
    //     const state = BerraEngine.#resetState();

    //     // const session = new GameSession(game, state);
    //     // session.startNewGame();

    //     // return session;
    // }
} 