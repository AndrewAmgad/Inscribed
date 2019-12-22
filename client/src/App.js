import React, { Component } from 'react';
import './App.css';
import Router from './Router';
import Navigation from './navigation/nav-controller'
import { connect } from "react-redux";
import { checkAuth, signOut } from "./redux/Actions/user"
import { sendSearchInput } from './redux/Actions/search';
import { withRouter } from "react-router";
import { getFolders } from "./redux/Actions/folders";
import { enableDarkMode } from "./redux/Actions/dark_mode";

class App extends Component {

  componentDidMount() {
    this.props.checkAuth()
    this.props.getFolders()

  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.checkAuth();
      this.props.getFolders();
    };
  };


  // REPLACE THE ENDLESS LOADING SCREEN WHEN THERE IS A FETCH ERROR
  render() {

    const darkBackgroundClass = this.props.darkMode ? "dark-background" : "";
    
    if (!this.props.authError) {
      return (
        <div className={darkBackgroundClass} style={{ height: "100%" }}>
          <Navigation
            authResponse={this.props.authResponse}
            signOut={this.props.signOut}
            sendSearchInput={this.props.sendSearchInput}
            foldersResponse={this.props.foldersResponse}
            darkMode={this.props.darkMode}
            darkModeData={this.props.darkModeData}
            enableDarkMode={this.props.enableDarkMode}
          />
          <div style={!this.props.authResponse.authenticated ? { "marginLeft": "0px" } : {}} className={"router-container " + darkBackgroundClass}>
            <Router />
          </div>
        </div>
      )
    } else {
      return (
        <div
          style={{ "position": "fixed", "top": "50%", "left": "50%", "width": "50px", "height": "50px" }}
          className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    };
  }
};

const mapStateToProps = (state) => {
  return {
    authResponse: state.authReducer.authResponse,
    foldersResponse: state.foldersReducer.foldersResponse,
    foldersError: state.foldersReducer.error,
    authError: state.authReducer.error,
    darkMode: state.darkModeReducer.darkMode,
    darkModeData: state.darkModeReducer.darkModeData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: (callback) => {
      dispatch(checkAuth(callback))
    },
    signOut: (callback) => {
      dispatch(signOut(callback))
    },
    sendSearchInput: (input) => {
      dispatch(sendSearchInput(input))
    },
    getFolders: (callback) => {
      dispatch(getFolders(callback));
    },

    enableDarkMode: (enabled, callback) => {
      dispatch(enableDarkMode(enabled, callback));
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
