import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Comment from './Comment'
import Loader from './Loader'
import {checkAndLoadComments} from '../AC'

class CommetnsPagination extends Component {
    componentWillMount() {
      this.props.checkAndLoadComments(this.props.page)
    }
    componentWillReceiveProps({page, checkAndLoadComments}) {
        checkAndLoadComments(page);
    }
    render() {
        const {total} = this.props
        if (!total) return <Loader/>
        return (
            <div>
               {this.getCommetns()}
               {this.getPaginator()}
            </div>
        )
    }

    getCommetns() {
        const {comments, loading} = this.props;
        if(loading || !comments) return <Loader />
        const items = comments.map((id) => {
            return <li key = {id}><Comment id = {id} /></li>
        });
        return <ul>{items}</ul>
    }
    getPaginator() {
        const {total} = this.props;
        let items = [];
        for(let i = 1; i <= Math.floor((total -1) / 5) + 1; i++) {
            items.push(<li key = {i}><NavLink to = {`/comments/${i}`} activeStyle = {{color:'red'}}>{i}</NavLink></li>)
        } 
        return <ul>{items}</ul>
    }

}

export default connect((state, { page }) => {
    const {total, pagination} = state.comments
    return {
        total,
        loading: pagination.getIn([page, 'loading']),
        comments: pagination.getIn([page, 'ids'])
    }
}, { checkAndLoadComments })(CommetnsPagination)