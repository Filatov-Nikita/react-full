import {normalizedComments} from "../fixtures";
import { arrToMap } from "../helpers";
import { Record, Map, OrderedMap } from "immutable";
import { LOAD_COMMENTS, START, SUCCESS, LOAD_COMMENTS_FOR_PAGE } from "../consts";

const commentRecord = Record({
    id: null, 
    user: null,
    text: null
})
const reducerState = Record({
    entities: new OrderedMap({}),
    pagination: new Map({}),
    total: null
});
const defaultState = new reducerState();


export default (commentsState = defaultState, action) => {
    const {type, response, payload} = action;
    switch (type) {
        case 'ADD_COMMENT':
            return commentsState.setIn(['entities', action.randomId], new commentRecord({
                ...action.payload.comment, id: action.randomId
            }));
        case LOAD_COMMENTS + SUCCESS : 
            return commentsState.update('entities', entities => entities.merge(arrToMap(response, commentRecord)))
        case LOAD_COMMENTS_FOR_PAGE + START : 
            return commentsState.setIn(['pagination', payload.page, 'loading'], true);
        case LOAD_COMMENTS_FOR_PAGE + SUCCESS : 
            return commentsState
                .set('total', response.total)
                .mergeIn(['entities'], arrToMap(response.records, commentRecord))
                .setIn(['pagination', payload.page, 'ids'], response.records.map(comment => comment.id))
                .setIn(['pagination', payload.page, 'loading'], false)   
    }
    

    return commentsState
}