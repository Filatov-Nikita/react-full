import React, {Component as ReactComponent} from "react";
export default (OriginalComponent) => class ToogleOpenWrappedComponent extends ReactComponent {
    state = {
        isOpen: false
    }
    render() {
        return <OriginalComponent {...this.props} {...this.state} toogleOpen = {this.toogleOpen}/>
    }
    toogleOpen = () => this.setState({
        isOpen:!this.state.isOpen
    });
}