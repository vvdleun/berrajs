import { Context } from "./Context";
import { ACTION_EXAMINE_ID, ACTION_WALK_ID } from "./impl/actionIds";
import { RoomActionCollector } from "./impl/RoomActionCollector";
import { StateInitializer } from "./impl/StateInitializer";
import { GlobalStateReader } from "./impl/StateReader";
import { GlobalStateWriter } from "./impl/StateWriter";
import { TurnProcessor } from "./impl/TurnProcessor";
import { Turn } from "./Turn";

/** 
 * An active gaming session: the bridge between the front-end and the gaming engine.
 * 
 * The front-end communicates with the GameSession object by passing messages by calling the "action()" method.
 * The session searches for the current room's object that must handle the action, call the appropiate object's methods
 * and the session will collect the events and compute the turn. During processing of the turn, the engine will fire
 * various events (that the front-end can subscribe to when setting up the BerraEngine).
 */
export class GameSession {
    #game;
    #stateReader;
    #stateWriter;
    #context = null;
    #running = false;
    #outputHandler = null;

    constructor(game, outputHandler) {
        this.#game = game;
        this.#outputHandler = outputHandler;
    }

    resetGame() {
        if(this.#running) {
            throw "Game has already started";
        }

        const state = StateInitializer.createNewState();

        // Bad design alarm: mutates properties...
        this.#running = false;
        this.#stateReader = new GlobalStateReader(state);
        this.#stateWriter = new GlobalStateWriter(state);
        this.#context = new Context(state, this.#game);

        this.#game.initialize(this.#stateReader);

        this.#compute(this.#game.initTurn);

        this.#running = true;
    }

    stopGame() {
        if(!this.#running) {
            throw "Game was already stopped";
        }

        this.#running = false;
    }

    // Front-end calls this method to communicate about UI actions taken by the user
    // msg: { "action": "walk", objectIds:[ "allYourBaseId" ]}
    action(msg) {
        const context = this.#context;

        const room = context.room();
        const roomObjects = room.objects()
            .filter(obj => obj.id === msg.objectIds[0]);

        if(roomObjects.length !== 1) {
            throw `Object with id ${msg.objectIds[0]} not found in ${roomId}`;
        }

        const roomObject = roomObjects[0];

        // TODO move this logic to a TurnProcessor-alike class
        var events = null;
        if(msg.action === ACTION_WALK_ID) {
            events = roomObject.walk(context);
        } else if(msg.action === ACTION_EXAMINE_ID) {
            events = roomObject.examine(context);
        } else {
            throw "Unknown action: " + msg.action;
        }

        const turn = new Turn();
        events.forEach(event => turn.addEvent(event))

        this.#compute(turn);
    }

    #compute(turn) {
        this.#processTurnAndHandleOutputEvents(() => TurnProcessor.compute(turn, this.#stateWriter, this.#outputHandler, this.#context));
    }

    #undo(turn) {
        this.#processTurnAndHandleOutputEvents(() => TurnProcessor.undo(turn, this.#stateWriter, this.#outputHandler, this.#context));
    }

    #processTurnAndHandleOutputEvents(turnProcessorCallback) {
        const context = this.#context;

        const oldRoom = context.room();
        const oldRoomName = (oldRoom && oldRoom.name(context)) || "";

        turnProcessorCallback();

        const newRoom = context.room();
        const newRoomName = newRoom.name(context);

        if(oldRoomName !== newRoomName) {
            this.#outputHandler.updateRoomName(newRoomName);
        }

        const actions = RoomActionCollector.collectSupportedActionsPerObject(newRoom);
        this.#outputHandler.updateActions(actions);
    }    
}