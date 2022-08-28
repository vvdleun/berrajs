export const ACTION_WALK_ID = 'walk';
export const ACTION_EXAMINE_ID = 'examine';
export const ACTION_TALK_ID = 'talk';
export const ACTION_PICK_UP_ID = 'pick_up';
export const ACTION_USE_ID = 'use';

const actionNames = {};
actionNames[ACTION_WALK_ID] = "Walk"; 
actionNames[ACTION_EXAMINE_ID] = "Examine";
actionNames[ACTION_TALK_ID] = "Talk";
actionNames[ACTION_PICK_UP_ID] = "Pick up";
actionNames[ACTION_USE_ID] = "Use"

export const ACTION_NAMES = actionNames;

export const ALL_ACTION_IDS = [
    ACTION_WALK_ID,
    ACTION_EXAMINE_ID,
    ACTION_TALK_ID,
    ACTION_PICK_UP_ID,
    ACTION_USE_ID];
