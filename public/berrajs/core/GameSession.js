import { ACTION_EXAMINE_ID, ACTION_WALK_ID } from "./impl/actionIds";
import { RoomActionCollector } from "./impl/RoomActionCollector";
import { StateInitializer } from "./impl/StateInitializer";
import { GlobalStateReader } from "./impl/StateReaders";
import { GlobalStateWriter } from "./impl/StateWriters";
import { TurnProcessor } from "./impl/TurnProcessor";
import { Turn } from "./Turn";

/** 
 * An active gaming session: the bridge between the front-end and the gaming engine.
 * 
 * The front-end communicates with the GameSession object by providing InputAction objects.
 * The session searches for the object that must handle the action, call the appropiate object's methods
 * and the session will collect the events and compute the turn. It will fire a callback, that the front-end
 * can subscribe to update the visual state.
 */
export class GameSession {
    #game;
    #stateReader;
    #stateWriter;
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

        this.#game.initialize(state);

        this.#compute(this.#game.initTurn);

        this.#running = true;
    }

    pauseGame() {
        if(!this.#running) {
            throw "Game is not running, cannot pause game";
        }

        // It is a turn-based engine, so assume there are no timers for now :-)
        this.#running = false;
    }

    continueGame() {
        if(this.#running) {
            throw "Game is already running, cannot unpause game";
        }

        this.#running = true;
    }

    stopGame() {
        if(!this.#running) {
            throw "Game was already stopped";
        }

        this.#running = false;
    }

    action(msg) {
        const roomId = this.#stateReader.roomId();
        const room = this.#game.rooms[roomId];
        const objects = room.objects()
            .filter(obj => obj.id === msg.objectIds[0]);

        if(objects.length !== 1) {
            throw `Object with id ${msg.objectIds[0]} not found in ${roomId}`;
        }

        const turn = new Turn()
        if(msg.action === ACTION_WALK_ID) {
            objects[0].walk().forEach(event => turn.addEvent(event));
        } else if(msg.action === ACTION_EXAMINE_ID) {
            objects[0].examine().forEach(event => turn.addEvent(event));
        } else {
            throw "Unknown action: " + msg.action;
        }

        this.#compute(turn);
    }

    #compute(turn) {
        this.#processTurnAndUpdateRoomName(() => TurnProcessor.compute(turn, this.#stateWriter, this.#outputHandler, this.#game));
    }

    #undo(turn) {
        this.#processTurnAndUpdateRoomName(() => TurnProcessor.undo(turn, this.#stateWriter, this.#outputHandler, this.#game));
    }

    #processTurnAndUpdateRoomName(turnProcessorCallback) {
        const oldRoomId = this.#stateReader.roomId();
        const oldRoomName = (oldRoomId && this.#game.rooms[oldRoomId].name()) || "";

        turnProcessorCallback();

        const newRoomId = this.#stateReader.roomId();
        const newRoom = this.#game.rooms[newRoomId];
        const newRoomName = newRoom.name();

        if(oldRoomName !== newRoomName) {
            this.#outputHandler.updateRoomName(newRoomName);
        }

        const actions = RoomActionCollector.collectSupportedActionsPerObject(newRoom);
        this.#outputHandler.updateActions(actions);
    }    
}