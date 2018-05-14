import React, {Component} from "react";
import ArticlesList from "../ArticlesList";
import Article from "../Article";
import { Route, Link } from "react-router-dom";
class Articles extends Component {
    componentWillUnmount() {
        console.log('unmointing');
        
    }
    componentWillUpdate() {
        console.log('updating');
        
    }
    render() {
        return (
            <div>
                <ArticlesList />
                <Route path = "/articles" render = {this.getHeader} exact />
                <Route path = "/articles/:id" render = {this.getArticle} />
            </div>
        )
    }

    getArticle = ({match}) => {
        const {id} = match.params;
        return <Article id = {id} isOpen key = {id}/>
    }
    getHeader = () => {
        return <h2>Please select article <Link to = "/articles/new">new</Link></h2>
    }
}

export default Articles;