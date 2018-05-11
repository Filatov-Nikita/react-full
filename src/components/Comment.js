import React from 'react';
import { connect } from "react-redux";
import { commentsSelectorFactory } from "../selectors";
function Comment(props) {
    const {comment} = props;
    return (
        <div>
           <h4>
               {comment.user}
            </h4> 
            <div>
                {comment.text}
            </div>
        </div>
    )
}

const mapStateToProps = () => {
    const selector = commentsSelectorFactory();
    return (state, props) => {
        return {comment: selector(state, props)}
    }
}
    

export default connect(mapStateToProps)(Comment);