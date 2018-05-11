import React, {Component} from 'react'
import Article from "./Article";
import accordion from "../decorators/accordion";
import { connect } from "react-redux";
import { articlesFiltrate } from "../selectors";
import { loadArticles } from "../AC";
import { PropTypes } from "prop-types";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
//import { findDOMNode } from "react-dom";

class ArticleList extends Component {

    static propTypes = {
        articles:PropTypes.array.isRequired
    }
    componentDidMount() {
        const {loading, loaded,loadArticles} = this.props;
        if(!loading && !loaded) { loadArticles() }
    }
    render() {
        const {articles, loading, loaded} = this.props;
        if(loading) { return  <Loader />} 
        const articleElements = articles.map((article) => 
        <li key = {article.id}>
            <Article ref = {this.testRef}
                article = {article} 
                isOpen = {this.props.openArticleId === article.id} 
                toogleOpen = {this.props.toogleOpen}/>
               
        </li>);
        return (
            <ul>
                {articleElements}
            </ul>
        )
    }


    // так можно получать инстанс компонента через рефсы и обращаться к ним как к обычным объектам
    // testRef = (articleInstance) => {
    //     const res = articleInstance.getValue();
    //     console.log(res);
    //     console.log(findDOMNode(articleInstance)); // можно получать дом ноду в которую сгенерился компомнент и всю дочернюю иерархию
    // } 
}

const decorator = connect((state, ownProps) => ({
        articles: articlesFiltrate(state),
        loading: state.articles.loading ,
        loaded: state.articles.loaded
    }), { loadArticles });
export default decorator(accordion(ArticleList));
