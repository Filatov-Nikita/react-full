import {createStore} from "redux";
import reducer from "../redusers";
import { applyMiddleware } from "redux";
import logger from "../middlewares/logger";
import generateId from "../middlewares/generateId";
import callAPI from "../middlewares/callAPI";
import ReduxThunk from "redux-thunk";
const middlewares = applyMiddleware(ReduxThunk, generateId, callAPI,logger);

const store = createStore(reducer, {}, middlewares);

window.store = store;

export default store;