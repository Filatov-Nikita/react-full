import { SUCCESS, START } from "../consts";
export default store => next => action => {
    const {type, callAPI} = action;
    if(!callAPI) { return next(action) }

    next({
        ...action,
        type: type + START
    });

     fetch(action.callAPI)
        .then(res => res.json())
        .then(response => next({...action, type: type + SUCCESS,response}));
}