import React, {Component} from 'react'
import Articles from './routes/Articles'
import Select from 'react-select'
import Counter from "./Counter";
import DateFilter from "./DateFilter";
import { connect } from "react-redux";
import { mapToArr } from "../helpers";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import 'react-select/dist/react-select.css'

    class App extends Component {
        state = {
            selected: null,
        }

        render() {
            const {articles} = this.props;
            const options = mapToArr(articles).map(article => ({
                label: article.title,
                value: article.id
            }));
            return (
                <BrowserRouter>
                    <div>
                        <div>
                            <h2>Menu</h2>
                            <div><NavLink activeStyle = {{color: 'red'}} to = "/counter">Counter</NavLink></div>
                            <div><NavLink activeStyle = {{color: 'red'}} to = "/articles">Articles</NavLink></div>
                        </div>
                        <DateFilter />
                        <Route path = "/counter" component = {Counter} />
                        <Select options = {options} value = {this.state.selected} onChange = {this.changeSelection} multi />
                        <Route path = "/articles" component = {Articles} />
                    </div>
                </BrowserRouter>
            )
        }
        
        changeSelection = selection => this.setState({
            selected: selection
        });  
    }

    export default connect(({articles}) => ({
        articles
    }))(App);