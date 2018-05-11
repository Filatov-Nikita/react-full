import {combineReducers} from "redux";
import counter from "./countReducer";
import articlesReducer from "./articlesReducer";
import filterReducer from "./filterReducer";
import commentsReducer from "./commentsReducer";
export default combineReducers({
    count: counter,
    articles: articlesReducer,
    filters: filterReducer,
    comments: commentsReducer
});