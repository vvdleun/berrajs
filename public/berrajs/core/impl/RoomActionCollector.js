import { ACTION_EXAMINE_ID, ACTION_NAMES, ACTION_TALK_ID, ACTION_USE_ID, ACTION_WALK_ID, ALL_ACTION_IDS } from "./actionIds";

export class RoomActionCollector {

    static collectSupportedActionsPerObject(room) {
        // Determine which events are supported by the current objects in the given room.
        const actions = {};
        ALL_ACTION_IDS.forEach(actionId => {
            actions[actionId] = {
                name: ACTION_NAMES[actionId],
                objects: []
            };
        })
        room.objects().forEach(o => {
            const receiverObject = {
                id: o.id,
                name: o.name()
            };

            if(o.walkable()) {
                actions[ACTION_WALK_ID].objects.push(receiverObject);
            }
            if(o.examinable()) {
                actions[ACTION_EXAMINE_ID].objects.push(receiverObject);
            }
            if(o.talks()) {
                actions[ACTION_TALK_ID].objects.push(receiverObject);
            }
            if(o.pickable()) {
                // TODO on which objects?
                actions[ACTION_USE_ID].objects.push(receiverObject);
            } 
        });

        // Remove unavailable actions
        Object.entries(actions)
            .filter(item => item[1].length === 0)
            .forEach(item => {
                delete actions[item];
            });

        return actions;
    }
}