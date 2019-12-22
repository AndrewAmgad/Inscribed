import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React, { Component } from 'react'
import { withRouter } from "react-router";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './CSS/side-nav.css'
import Placeholder from '../images/placeholder.png'
import 'font-awesome/css/font-awesome.min.css';
import {mapDarkModeDataToState} from '../redux/Actions/dark_mode';

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.mapDarkModeDataToState = mapDarkModeDataToState.bind(this);
    }

    componentWillMount() {
        this.mapDarkModeDataToState()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.darkMode !== this.props.darkMode) {
            this.mapDarkModeDataToState()
        }
    }

    createNavItem(key, iconClass, text) {
        const darkMode = this.props.darkMode

        return (
            <NavItem navitemStyle={this.state.darkBackgroundObject} navitemClassName={"navItem"} disabled={key === "" ? true : false} eventKey={key ? key : ""}>
                <NavIcon>
                    <i className={iconClass} style={{ fontSize: '1.75em', color: !darkMode ? "black" : "white" }} />
                </NavIcon>
                <NavText>
                    <text style={{color: !darkMode ? "black" : "white" }}>{text}</text>
                </NavText>
            </NavItem>
        )
    }

    render() {
        const folders = this.props.foldersResponse ? this.props.foldersResponse.folders : [];
        const darkMode = this.props.darkMode

        return (
            <SideNav style={{ "visibility": this.props.visibility, backgroundColor: darkMode ? "rgb(44, 44, 44)" : "" }} disabled={false} expanded={this.props.expanded}
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (selected !== "") {
                        if (this.props.location.pathname !== to) {
                            this.props.history.push(to);
                        }
                    }
                }}
            >

                <SideNav.Nav selected={this.props.location.pathname.replace("/", "")}>

                    {this.createNavItem("home", "fa fa-home", "Home")}
                    {this.createNavItem("archive", "fa fa-archive", "Archive")}

                    <br />
                    <div className="line"></div>
                    <br />
                    <text className={"nav-label " + this.state.darkTextClassName} style={{ "display": this.props.displayTitles }}>Folders</text>

                    {/* Check if there are folders before displaying any */}
                    {folders ? folders.length > 0 ?
                        folders.map((folder => {
                            var folderName = folder.length > 15 ? folder.substring(1, 15) : folder;
                            return (
                                this.createNavItem("folder/" + folderName, "fa fa-fw fa-folder", folderName )
                            )
                        })) : this.createNavItem("", "", "No folders yet") : this.createNavItem("", "", "No folders yet")
                    }

                    <br />
                    <div className="line"></div>
                    <br />

                    <text className={"nav-label " + this.state.darkTextClassName} style={{ "display": this.props.displayTitles }}>Account</text>

                    <NavItem navitemStyle={this.state.darkBackgroundObject} eventKey="user">

                        <NavIcon >
                            <img className="nav-icon" src={Placeholder} alt="profile" />
                        </NavIcon>

                        <NavText>
                            <t style={{color: !darkMode ? "black" : "white" }}>{this.props.authResponse.firstName + " " + this.props.authResponse.lastName}</t>
                        </NavText>

                        <NavItem navitemStyle={this.state.darkBackgroundObject} onClick={this.props.signOut}>
                            <NavText>
                                <i className={"fa fa-sign-out " + this.state.darkTextClassName} style={{ "fontSize": '1.30em', "color": "black", "marginLeft": "20px", "marginRight": "8px" }} />
                                <text style={{color: !darkMode ? "black" : "white" }}>Sign Out</text>
                            </NavText>
                        </NavItem>

                    </NavItem>

                    <NavItem navitemStyle={this.state.darkBackgroundObject} eventKey="settings">
                        
                        <NavIcon>
                            <i className="fa fa-cog" style={{ fontSize: '1.75em', color: !darkMode ? "black" : "white" }} />
                        </NavIcon>

                        <NavText>
                        <text style={{color: !darkMode ? "black" : "white" }}>Settings</text>
                        </NavText>
                        <NavItem navitemStyle={this.state.darkBackgroundObject} onClick={this.props.enableDarkMode} eventKey="">
                            <NavText>
                                <i className={"fa fa-adjust " + this.state.darkTextClassName} style={{ "fontSize": '1.30em', "color": "black", "marginLeft": "20px", "marginRight": "8px" }} />
                                <text className={this.state.darkTextClassName}>{this.props.darkMode ? "Disable" : "Enable"} Dark Mode</text>
                            </NavText>
                        </NavItem>
                    </NavItem>


                    <br /><br /><br /><br />

                    <div className="nav-text-item" style={{
                        "display": this.props.displayTitles, "bottom": "36px"
                    }}>Contact us</div>

                    <div className="nav-text-item" style={{
                        "display": this.props.displayTitles,
                    }}>© 2019 Copyright: Andrew Amgad</div>

                </SideNav.Nav>
            </SideNav>
        )
    }
}

export default withRouter(NavBar)


