export class RoomActionCollector {

    static collectSupportedActionsPerObject(room) {
        // Determine which events are supported by the current objects in the given room.
        const actions = {
            walk: {
                "name": "Walk",
                "objects": []
            },
            examine: {
                "name": "Examine",
                "objects": []
            },
            talk: {
                "name": "Talk",
                "objects": []
            },
            pickUp: {
                "name": "Pick Up",
                "objects": []
            },
            use: {
                "name": "Use",
                "objects": []
            },
        }

        room.objects().forEach(o => {
            const receiverObject = {
                id: o.id,
                name: o.name()
            };

            if(o.walkable()) {
                actions.walk.objects.push(receiverObject);
            }
            if(o.examinable()) {
                actions.examine.objects.push(receiverObject);
            }
            if(o.talks()) {
                actions.talk.objects.push(receiverObject);
            }
            if(o.pickable()) {
                // TODO on which objects?
                actions.use.objects.push(receiverObject);
            } 
        });

        // Remove unavailable actions
        Object.entries(actions)
            .filter(item[1].length === 0)
            .forEach(item => {
                delete actions[item];
            });

        return actions;
    }
}