export class GameObject {
    id = "";
    state = null

    constructor(id, state) {
        this.id = id;
        this.state = state;
    }

    name() {
        return "Object without a name";
    }

    // WALK

    walkable() {
        return false;
    }

    walkBefore() {
        return [];
    }

    walk() {
        return [];
    }
    
    walkAfter() {
        return [];
    }

    // EXAMINE

    examinable() {
        return false;
    }

    examineBefore() {
        return [];
    }

    examine() {
        return [];
    }

    examineAfter() {
        return [];
    }

    // TALK

    talks() {
        return false;
    }

    talkBefore() {
        return [];
    }

    talk() {
        return [];
    }

    talkAfter() {
        return [];
    }

    // PICK UP

    pickable() {
        return false;
    }

    pickedUpBefore() {
        return [];
    }

    pickedUp() {
        return [];
    }

    pickedUpAfter() {
        return [];   
    }

    // USE OBJECT X ON Y

    // Is object itself USE-able?
    usable() {
        return false
    }

    usedBefore(usedObject) {
        return [];
    }

    used(usedObject) {
        return [];
    }

    usedAfter(usedObject) {
        return [];
    }

    // Given object is used on this object

    canUseObject(usedObject) {
        return false
    }

     useObjectBefore(usedObject) {
        return [];
    }

    useObject(usedObject) {
        return [];
    }

    useObjectAfter(usedObject) {
        return [];
    }
} t