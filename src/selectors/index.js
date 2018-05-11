import { createSelector } from "reselect";
import { mapToArr } from "../helpers";
const articlesGetter = state => state.articles.entities;
const filtersGetter = state => state.filters; 
const commentsGetter = state => state.comments.entities;
const idGetter = (state, props) => props.id


export const articlesFiltrate = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
    const {dateRange} = filters;
    const {from, to} = dateRange;
    const articlesList = mapToArr(articles).filter((article) => {
        const parseDate = Date.parse(article.date);
        return !from || !to || (parseDate > from && parseDate < to)
    });
    return articlesList
}); 

export const commentsSelectorFactory = () => createSelector(commentsGetter, idGetter, (comments, id) => {
    //console.log(comments.get(id));
    return comments.get(id)
});