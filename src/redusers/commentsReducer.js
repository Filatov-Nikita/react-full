import {normalizedComments} from "../fixtures";
import { arrToMap } from "../helpers";
import { Record, OrderedMap } from "immutable";
import { LOAD_COMMENTS, START, SUCCESS } from "../consts";

const commentRecord = Record({
    id: null, 
    user: null,
    text: null
})
const reducerState = Record({
    entities: new OrderedMap({})
});
const defaultState = new reducerState();


export default (commentsState = defaultState, action) => {
    const {type, response} = action;
    switch (type) {
        case 'ADD_COMMENT':
            return commentsState.setIn(['entities', action.randomId], new commentRecord({
                ...action.payload.comment, id: action.randomId
            }));
        case LOAD_COMMENTS + SUCCESS : 
            return commentsState.update('entities', entities => entities.merge(arrToMap(response, commentRecord)))
    }
    

    return commentsState
}