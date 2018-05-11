import {normalizedArticles as articles} from "../fixtures";
import { LOAD_ARTICLES, START, SUCCESS, FAIL, LOAD_ARTICLE, LOAD_COMMENTS } from "../consts";
import { loadArticles } from "../AC";
import { arrToMap } from "../helpers";
import { Map, Record, OrderedMap } from "immutable";

const reduserState = Record({
    loading: false,
    loaded: false,
    entities: new OrderedMap({}) 
});

const defaultState = new reduserState();
const articlesRecord = Record({
    title: undefined,
    text: undefined,
    id: undefined,
    comments: [],
    loading: false,
    commentsLoading: false,
    commentsLoaded: false
});

export default (articlesState = defaultState, action) => {
    const {type, response} = action;
    switch(type) {
        case 'deleteArticles' :
             return articlesState.deleteIn(['entities',action.payload.id]);
        case 'ADD_COMMENT': 
                return articlesState.updateIn(['entities', action.payload.articleId, 'comments'], comments => comments.concat(action.randomId));
        
        case LOAD_ARTICLES + START: 
            return articlesState.set('loading', true);
        case LOAD_ARTICLES + SUCCESS: 
            return articlesState.set('entities', arrToMap(response, articlesRecord))
            .set('loading', false)
            .set('loaded', true);
        case LOAD_ARTICLE + START: 
            return articlesState.setIn(['entities', action.payload.id, 'loading'], true)
        case LOAD_ARTICLE + SUCCESS: 
            return articlesState.setIn(['entities', action.payload.id], new articlesRecord(action.payload.response))
        case LOAD_COMMENTS + START : 
        return articlesState.setIn(['entities', action.payload.articleId, 'commentsLoading'], true)
        case LOAD_COMMENTS + SUCCESS : 
            return articlesState.setIn(['entities', action.payload.articleId, 'commentsLoading'], false)
            .setIn(['entities', action.payload.articleId, 'commentsLoaded'], true)
    }
    return articlesState
}