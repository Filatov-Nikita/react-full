import { LOAD_ARTICLES, START, SUCCESS, LOAD_ARTICLE, LOAD_COMMENTS } from "../consts";
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
        callAPI: `api/comment?article=${articleId}`
    }
}