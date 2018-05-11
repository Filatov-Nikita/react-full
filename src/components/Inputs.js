import React, {Component} from "react";

class Inputs extends Component {
    render() {
        return (
            <div>
                <div>
                    <input type="text" onChange = {this.validate} value = {this.props.value} />
                </div>
            </div>
        ) 
    }
    validate = (ev) => {
            const {pattern, changeStatus} = this.props;
            const value = ev.target.value;
            const isValid = pattern.test(value);
             changeStatus(!isValid)
                  return this.props.handler(value);
        }
}

export default Inputs;