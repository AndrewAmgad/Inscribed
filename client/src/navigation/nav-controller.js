import React, { Component } from 'react';
import SideNavBar from './side-nav'
import TopNavBar from './main-nav'
import { withRouter } from "react-router";


class Navigation extends Component {
    constructor(props) {
        super(props)
        this.toggler = this.toggler.bind(this);
        this.state = {
            visibility: "visible",
            expanded: true,
            showSearchBar: false,
            showTopBar: true,

        }

        this.updateDimensions = this.updateDimensions.bind(this);
        this.showSearchBar = this.showSearchBar.bind(this);
        this.signOut = this.signOut.bind(this);
        this.enableDarkMode = this.enableDarkMode.bind(this);

    };

    signOut() {
        this.props.signOut(() => {
            this.props.history.push("/user/signin")
        })
    }

    // Update the dimensions of the side navigation bar on window size change.

    updateDimensions() {
        var width = window.innerWidth;

        if (width > 800) {
            this.setState({ showSearchBar: false })
        }

        if (width > 599 && width < 1000) {
            this.setState({ displayTitles: "none", visibility: "hidden" })
        } else {
            this.setState({ displayTitles: "" })
        }

        if (width < 1000) {
            this.setState({
                visibility: "hidden",
                expanded: false
            })
        } else {
            this.setState({
                visibility: "visible",
                expanded: true
            })
        }

    }

    // Expand the side navigation onClick
    toggler() {
        const visibility = this.state.visibility;
        const expanded = this.state.expanded;
        if (visibility === "hidden" && !expanded) {
            this.setState({
                visibility: "visible",
                expanded: true
            })
        } else {
            this.setState({
                visibility: "hidden",
                expanded: false
            })
        }

    }

    // Show the search bar on small devices once the search icon is clicked
    showSearchBar() {
        if (!this.state.showSearchBar) {
            this.setState({ showSearchBar: true, expanded: false, visibility: "hidden" });
        } else {
            this.setState({ showSearchBar: false, expanded: false, visibility: "hidden" });
        };
    };

    enableDarkMode(){
   
        const darkMode = this.props.darkMode;
        if(darkMode){
            this.props.enableDarkMode(false);
            console.log("Dark Mode disabled")
        } else {
            this.props.enableDarkMode(true);
            console.log("Dark Mode enabled")
        }
  
     
    }

    componentDidMount() {
        // Hide the navbar automatically if the viewport is less that 1000 pixels
        this.updateDimensions()
        window.addEventListener("resize", this.updateDimensions);
    }

    // Close the navigation bar once an item is clicked on small screens

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname && window.innerWidth < 1000) {
            this.setState({
                expanded: false,
                visibility: "hidden"
            })

            // Hide the top navigation bar when a note modal is open if the screen is too small
            if (window.innerWidth < 500 && this.props.history.location.pathname.includes('/note')) {
                this.setState({
                    showTopBar: false
                });
            } else if(!this.props.location.pathname.includes('/note')) {
                this.setState({
                    showTopBar: true
                })
            }

        }

    }

    render() {
        return (
            <div>
                <TopNavBar
                    onClick={this.toggler}
                    expanded={this.state.expanded}
                    searchOnClick={this.showSearchBar}
                    showSearchBar={this.state.showSearchBar}
                    authResponse={this.props.authResponse}
                    visibility={this.state.showTopBar}
                    sendSearchInput={this.props.sendSearchInput}
                    darkMode={this.props.darkMode}
                    darkModeData={this.props.darkModeData}
                    enableDarkMode={this.enableDarkMode}

                />
                {this.props.authResponse.authenticated ?
                    <SideNavBar
                        visibility={this.state.visibility}
                        expanded={this.state.expanded}
                        displayTitles={this.state.displayTitles}
                        authResponse={this.props.authResponse}
                        foldersResponse={this.props.foldersResponse}
                        signOut={this.signOut}
                        darkMode={this.props.darkMode}
                        darkModeData={this.props.darkModeData}
                        enableDarkMode={this.enableDarkMode}
                    />
                    :
                    null
                }

            </div>
        )
    }
}



export default withRouter(Navigation);