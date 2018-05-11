import React, { Component } from "react";
import Inputs from "./Inputs";
import { connect } from "react-redux";
import { addComment } from "../AC";
    class Form extends Component {
      state = {
          disabled: true,
          user: '',
          text: ''
      }

        render() {
            return (
                <div>
                   <form>
                        <Inputs pattern = {/^[0-9]{7,14}$/} changeStatus = {this.changeStatus} value = {this.state.user} handler = {this.handlerUser}/>
                        <Inputs pattern = {/$/} changeStatus = {this.changeStatus} value = {this.state.text} handler = {this.handlerText}/>
                        <button disabled = {this.state.disabled} onClick = {this.handleSubmit}>Сохранить</button>
                   </form>
                </div>
            )
        }
        handlerUser = (value) => {
            return this.setState({
                user: value
            })
        }
        handlerText = (value) => {
            return this.setState({
                text: value
            })
        }
        handleSubmit = (event) => {
            event.preventDefault();
            this.props.addComment(this.state);
            return this.setState({
                user: '',
                text: ''
            })
        }
        changeStatus = (isValid) => {
            return this.setState({
                disabled: isValid
            });
            
        }

    }

    export default connect(null, (dispatch, ownProps) => ({
        addComment: (comment) => dispatch(addComment(comment, ownProps.articleId))
    }))(Form);