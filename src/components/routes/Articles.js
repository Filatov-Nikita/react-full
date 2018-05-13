import React, {Component} from "react";
import ArticlesList from "../ArticlesList";
import Article from "../Article";
import { Route } from "react-router-dom";
class Articles extends Component {
    render() {
        return (
            <div>
                <ArticlesList />
                <Route path = "/articles/:id" render = {this.getArticle} />
            </div>
        )
    }

    getArticle = ({match}) => {
        const {id} = match.params;
        return <Article id = {id} isOpen toogleOpen = {() => {return null}}/>
    }
}

export default Articles;