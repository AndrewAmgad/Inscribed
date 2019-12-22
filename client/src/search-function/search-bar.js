import React, { Component } from 'react'
import { withRouter } from "react-router";
import './search-bar.css'
import searchicon from '../images/searchicon.png'

class NewSearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQuery: "",
            searchInput: "",
            value: ""
        }
        this.sendSearchInput = this.sendSearchInput.bind(this);
    }

    // Send search input to Redux searchReducer
    sendSearchInput() {
        var searchInput = this.searchInput.value;
            this.props.sendSearchInput(searchInput);
            
    }


    componentDidMount() {
        // Force-focus on the search input once it is mounted if the screen width is less than 800px
        if (window.innerWidth < 800) {
            this.searchInput.focus()
        }
    }

    // Clear search input on component unmount.
    componentWillUnmount(){
        this.props.sendSearchInput("")
    }


    render() {
        return (
            <form onSubmit={(event) => {event.preventDefault()}} style={{ "border": "0px", "position": "relative" }} className={"search-bar-container card card-sm " + this.props.darkBackgroundClassName}>
                <div style={{ "paddingLeft": "0px" }} className="card-body search-bar row no-gutters align-items-center ">

                    <div className="col">
                        {this.props.showSearchBar ?
                            <i onClick={this.props.onClick} className="fa fa-arrow-left back-icon fa-thin" /> : <img alt="search" className="search-icon" src={searchicon} />}
                        <input className="search-bar-input form-control form-control-lg form-control-borderless" type="search"
                            placeholder="Search"
                            onChange={this.sendSearchInput}
                            ref={(input) => { this.searchInput = input; }} />

                    </div>

                </div>
            </form>
        )
    }
}

export default withRouter(NewSearchBar)