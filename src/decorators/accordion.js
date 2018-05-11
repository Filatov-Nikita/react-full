import React, {Component as ReactComponent} from "react";
export default (OriginalComponent) => class AccordionComponent extends ReactComponent {
    state = {
        openArticleId: this.props.defaultOpen
    }
    render() {
        return <OriginalComponent {...this.props} openArticleId = {this.state.openArticleId} toogleOpen = {this.toogleOpen} />
    }
    toogleOpen = (articleId) => () => {
            this.setState({
            openArticleId: articleId === this.state.openArticleId ? null : articleId
        })
    }
}