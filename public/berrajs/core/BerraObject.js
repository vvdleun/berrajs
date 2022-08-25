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
        return false;
    }

    walk() {
    }
    
    walkAfter() {
    }

    // EXAMINE

    examinable() {
        return false;
    }

    examineBefore() {
        return false;
    }

    examine() {
        return null;
    }

    examineAfter() {
    }

    // TALK

    talks() {
        return false;
    }

    talkBefore() {
        return false;
    }

    talk() {

    }

    talkAfter() {

    }

    // PICK UP

    pickable() {

    }

    pickedUpBefore() {
        return false;
    }

    pickedUp() {

    }

    pickedUpAfter() {
        
    }

    // USE OBJECT X ON Y

    // Is object itself USE-able?
    usable() {
        return false
    }

    usedBefore(usedObject) {
        return false;
    }

    used(usedObject) {
        return false;
    }

    usedAfter(usedObject) {

    }

    // Given object is used on this object

    canUseObject(usedObject) {
        return false
    }

     useObjectBefore(usedObject) {
        return false;
    }

    useObject(usedObject) {
        return [];
    }

    useObjectAfter(usedObject) {
    }

    subscribesToTurns() {
        return false;
    }

    compute(state) {

    }
}