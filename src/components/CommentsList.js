import React, {Component} from 'react'
import Comment from './Comment'
import toogleOpen from "../decorators/toogleOpen";
import Form from "./Form";
import { loadComments } from "../AC";
import { connect } from "react-redux";
import Loader from "./Loader";

    class CommentsList extends Component {

        componentWillReceiveProps({isOpen, article, loadComments}) {
            if(isOpen && !article.commentsLoading && !article.commentsLoaded) {
                loadComments(article.id)
            }
        }
        render() {
             const {isOpen} = this.props;
            return (
                <div>
                     <ul>
                        <button onClick = {this.props.toogleOpen}>{isOpen ? 'Close Comments List' : 'Open Comments List'}</button>
                            { this.getBody() }
                     </ul>
                </div>
            )
        }

        getBody = () => {
            const {article: {comments = [], id, commentsLoaded, commentsLoading}} = this.props;
            if(!this.props.isOpen) return null;
            if(commentsLoading) return <Loader />
            if(!commentsLoaded) return null;
            if(!comments || !comments.length) return <p>No comments yet</p>
                const elements = comments.map((id) => <li key = {id}><Comment id = {id} /></li>)
            return (
                <div>
                    {elements}
                     <Form articleId = {id}/>
                </div>
            );
        }
    }

    export default connect(null, {loadComments})(toogleOpen(CommentsList));