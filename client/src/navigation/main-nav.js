import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import Logo from '../images/Logo.png'
import SearchBar from '../search-function/search-bar'
import MediaQuery from 'react-responsive';
import './CSS/navbar.css';
import { mapDarkModeDataToState } from '../redux/Actions/dark_mode';


class MainNavBar extends Component {
    constructor(props) {
        super(props)

        this.mapDarkModeDataToState = mapDarkModeDataToState.bind(this)
    };

    componentWillMount() {
        this.mapDarkModeDataToState()
    };

    componentDidUpdate(prevProps) {
        if (prevProps.darkMode !== this.props.darkMode) {
            this.mapDarkModeDataToState()
        }
    };

    render() {

        const NavBarToggler = () => (
            <button style={{ "marginRight": "5px", "marginTop": "5px" }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                {this.props.expanded ? <i className={this.props.darkMode ? "fa fa-close fa-thin-black " + this.state.darkTextClassName : "fa fa-close fa-thin-white"} style={{ "fontSize": "23px" }} aria-hidden="true"></i> 
                : <i className={this.props.darkMode ? "fa fa-bars fa-thin-black " + this.state.darkTextClassName : "fa fa-bars fa-thin-white"} style={{ "fontSize": "23px" }} aria-hidden="true"></i>}
            </button>
        )

        if (!this.props.visibility) {
            return (
                ""
            )
        }


        // Check if the search button is clicked on small devices, render the search bar if it is.
        if (this.props.showSearchBar && this.props.authResponse.authenticated) {
            return (

                <SearchBar
                    showSearchBar={this.props.showSearchBar}
                    onClick={this.props.searchOnClick}
                    sendSearchInput={this.props.sendSearchInput}
                    darkBackgroundClassName={this.state.darkBackgroundClassName}
                    darkTextClassName={this.state.darkTextClassName} />
            )
        } else {
            return (
                <div>
                    <div className="navigation-bar">
                        <nav className={"navbar navbar-expand-lg navbar-light fixed-top " + this.state.darkBackgroundClassName}>
                            
                            <Link className="navbar-brand" to="/home">
                                <img style={this.props.darkMode ? {visibility: "hidden"} : {}} alt="Inscribed" className="brand-img" src={Logo} />
                                <text style={this.props.darkMode ? {marginLeft: "-20px"} : {}} className={"brand-name " + this.state.darkTextClassName}> Inscribed</text>
                            </Link>

                            {this.props.authResponse.authenticated ?
                                <MediaQuery query="(max-width: 800px)">
                                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                        <i onClick={this.props.searchOnClick} 
                                        className={this.props.darkMode ? "fa fa-thin-black fa-search nav-search-icon " + this.state.darkTextClassName : "fa fa-thin-white fa-search nav-search-icon"} aria-hidden="true"></i>
                                    </ul>
                                </MediaQuery> : ""
                            }

                            {this.props.authResponse.authenticated ?
                                <MediaQuery query="(min-width: 800px)">
                                    <SearchBar sendSearchInput={this.props.sendSearchInput} darkBackgroundClassName={this.state.darkBackgroundClassName}
                                        darkTextClassName={this.state.darkTextClassName} />
                                </MediaQuery>
                                :
                                ""
                            }

                            {this.props.authResponse.authenticated ?
                                <div onClick={this.props.onClick}>
                                    <NavBarToggler />
                                </div>

                                :
                                ""
                            }
                        </nav>
                    </div>
                </div>
            )
        }
    }
}


export default withRouter(MainNavBar);