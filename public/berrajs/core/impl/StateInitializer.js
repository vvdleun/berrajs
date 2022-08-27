export class StateInitializer {
    static createNewState() {
        return {
            "version": 0,       // Version of this structure
            "score": 0,         // Current score
            "rooms": {},        // State of individual rooms (if room manipulates state)
            "objects": {},      // State of individual objects (if object manipulates state)
            "roomId": null      // Active room
        };
    }
}