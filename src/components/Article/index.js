import React, {Component} from 'react';
import CommentsList from '../CommentsList';
import toogleOpen from "../../decorators/toogleOpen";
import { connect } from "react-redux";
import { deleteArticles, loadArticle } from "../../AC";
import Loader from "../Loader";
import { CSSTransitionGroup } from "react-transition-group";
import './transition.css';

    class Article extends Component {
        componentWillReceiveProps({isOpen, loadArticle, article}) {
            if(isOpen && !article.text && !article.loading) { loadArticle(article.id) }
        }

        render() {
            const {isOpen} = this.props;
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

    export default connect(null, {deleteArticles, loadArticle})(Article); 