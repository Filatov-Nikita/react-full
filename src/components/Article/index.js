import React, {Component} from 'react';
import CommentsList from '../CommentsList';
import toogleOpen from "../../decorators/toogleOpen";
import { connect } from "react-redux";
import { deleteArticles, loadArticle } from "../../AC";
import Loader from "../Loader";
import { CSSTransitionGroup } from "react-transition-group";
import './transition.css';
import { PropTypes } from "prop-types";

    class Article extends Component {
        static propTypes = {
            id: PropTypes.string
        }
        componentWillReceiveProps() {
            const {loadArticle, article} = this.props
            console.log(article);
            
            //oadArticle(article.id) 
        }

        render() {
            const {isOpen} = this.props;
            if(!this.props.article) return null;
            return (
                <div>
                    <h3>
                         {this.props.article.title}
                    </h3>
                   <button onClick = {this.props.toogleOpen(this.props.article.id)}>{isOpen ? 'Close' : 'Open'}</button>
                   <button onClick = {this.deleteHandle}>delete</button>
                   <CSSTransitionGroup 
                        transitionName = "article"
                        transitionAppear = {true}
                        transitionEnterTimeout = {500}
                        transitionLeaveTimeout = {300}
                        transitionAppearTimeout={1000}
                   >
                     {this.getBody()}
                   </CSSTransitionGroup>
                </div>
            )
        }
        deleteHandle = () => {
            this.props.deleteArticles(this.props.article.id);
        }
        getBody() {
            const {article, isOpen} = this.props;
            
            if(!isOpen) return null
            if(article.loading) { return <Loader /> }
            return (
               <div>
                {article.text}
                <CommentsList article = {article} />
               </div> 
            )
        }
        // getValue() {
        //     return 1001;
        // }
    }

    export default connect((state, ownProps) => ({
        article: state.articles.entities.get(ownProps.id)
    }), {deleteArticles, loadArticle})(Article); 