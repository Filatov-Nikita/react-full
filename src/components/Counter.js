import React, {Component} from "react";
import { connect } from "react-redux";
import {increment} from "../AC";
class Counter extends Component {
    render() {
        return (
            <div>
                <h2>Counter: {this.props.counter}</h2>
                <button onClick = {this.handleClick}>Inc</button>
            </div>
        ) 
    }

    handleClick = () => {
        this.props.increment();
    }
}
// function mapStateToProps(state) {
//     return {
//         counter: state.count
//     }
// }
// const mapToDispatch = {
//     increment
// }
// const decorator = connect(mapStateToProps, mapToDispatch);
export default connect((state) => ({
    counter: state.count
}), { increment })(Counter);