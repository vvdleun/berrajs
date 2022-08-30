export class GameObject {
    id = "";

    constructor(id) {
        this.id = id;
    }

    initialize(context) {

    }

    name(context) {
        return "Object without a name";
    }

    // WALK

    walkable(context) {
        return false;
    }

    walkBefore(context) {
        return [];
    }

    walk(context) {
        return [];
    }
    
    walkAfter(context) {
        return [];
    }

    // EXAMINE

    examinable(context) {
        return false;
    }

    examineBefore(context) {
        return [];
    }

    examine(context) {
        return [];
    }

    examineAfter(context) {
        return [];
    }

    // TALK

    talks(context) {
        return false;
    }

    talkBefore(context) {
        return [];
    }

    talk(context) {
        return [];
    }

    talkAfter(context) {
        return [];
    }

    // PICK UP

    pickable(context) {
        return false;
    }

    pickedUpBefore(context) {
        return [];
    }

    pickedUp(context) {
        return [];
    }

    pickedUpAfter(context) {
        return [];   
    }

    // USE OBJECT X ON Y

    // Is object itself USE-able?
    usable(context) {
        return false
    }

    usedBefore(usedObject, context) {
        return [];
    }

    used(usedObject, context) {
        return [];
    }

    usedAfter(usedObject, context) {
        return [];
    }

    // Given object is used on this object

    canUseObject(usedObject, context) {
        return false
    }

     useObjectBefore(usedObject, context) {
        return [];
    }

    useObject(usedObject, context) {
        return [];
    }

    useObjectAfter(usedObject, context) {
        return [];
    }
}