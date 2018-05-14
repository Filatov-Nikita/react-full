import { LOAD_ARTICLES, START, SUCCESS, LOAD_ARTICLE, LOAD_COMMENTS, LOAD_COMMENTS_FOR_PAGE } from "../consts";
export function increment() {
    return {
        type: 'INCREMENT'
    }
}
export function deleteArticles(id) {
    return {
        type: 'deleteArticles',
        payload: {
            id
        }
    }
}

export function changeRange(range) {
    return {
        type: 'CHANGERANGE',
        payload: {
            from: range.from,
            to: range.to
        }
    }
}

export function addComment(comment, articleId) {
    return {
        type: 'ADD_COMMENT',
        payload: {comment, articleId},
        generateId: true
    }
}

export function loadArticles() {
    return {
        type: LOAD_ARTICLES,
        callAPI: '/api/article'
    }
}

export function loadArticle(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_ARTICLE + START,
            payload: {id}
        });
        
        fetch(`/api/article/${id}`)
            .then(res => res.json())
            .then(response => dispatch({
                type: LOAD_ARTICLE + SUCCESS,
                payload: {id, response}
            }));
    }
}

export function loadComments(articleId) {
    console.log(articleId);
    return {
        type: LOAD_COMMENTS,
        payload: { articleId },
        callAPI: `/api/comment?article=${articleId}`
    }
}

export function checkAndLoadComments(page) {
    return (dispatch, getState) => {
        console.log(1234);
        
        const {comments: {pagination}} = getState()
        if (pagination.getIn([page, 'loading']) || pagination.getIn([page, 'ids'])) return

        dispatch({
            type: LOAD_COMMENTS_FOR_PAGE,
            payload: {page},
            callAPI: `/api/comment?limit=5&offset=${(page - 1)  * 5}`
        }) 
    }
}