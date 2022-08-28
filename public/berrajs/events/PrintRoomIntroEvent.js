import { Event } from "../core/Event.js";

export class PrintRoomIntroEvent extends Event {
    constructor(roomId) {
        super(
            (stateWriter, outputHandler, game) => {
                // Do action
                const introText = game.rooms[roomId].intro();
                if(introText) {
                    outputHandler.printLine(introText);
                }                
            },
            (stateWriter, outputHandler) => {
            }
        )
    }
    
}