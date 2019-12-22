import React, { Component } from 'react';
import './sign-in.css';
import { Link } from 'react-router-dom';
import SocialSignIn from './social-sign-in';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onInputChange() {
        var emailInput = this.emailInput.value;
        var passwordInput = this.passwordInput.value;

        var data = {
            email: emailInput,
            password: passwordInput
        }

        this.props.sendData(data);
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            if (this.props.button) {
                this.props.onSubmit();
            }
        }
    }

    render() {
         // Grab dark mode status from local storage.
        const darkMode = JSON.parse(localStorage.getItem("darkMode")) !== null ? JSON.parse(localStorage.getItem("darkMode")) : true
        const signPageClass = darkMode  ? "sign-page-dark" : "sign-page"

        return (

            <div>
                <div onKeyPress={(e) => this.handleKeyPress(e)} className={"container " + signPageClass}>

                    <div className=" sign-container">
                        <h2 className="sign-title text-center">Log into Inscribed</h2>
                        <SocialSignIn />
                        <div className="text-secondary" id="route-text"><center><Link className="route-link" to="/user/signup">Create Account</Link></center></div>
                        <input type="email"
                            className="form-control sign-input border-top-0 border-right-0 border-left-0"
                            aria-describedby="emailHelp"
                            placeholder="Email Address"
                            onChange={this.onInputChange}
                            maxLength="40"
                            ref={(input) => { this.emailInput = input; }}

                        />
                        <br />
                        <input type="password"
                            className="form-control sign-input border-top-0 border-right-0 border-left-0"
                            aria-describedby="passwordHelp"
                            placeholder="Password"
                            onChange={this.onInputChange}
                            ref={(input) => { this.passwordInput = input; }}

                        />

                        <div
                            style={{ "display": !this.props.errorValue ? "none" : "" }}
                            className="text-danger error-message">
                            {this.props.errorValue}

                        </div>

                        <br />
                        <button
                            className="btn sign-button"
                            onClick={this.props.onSubmit}
                            disabled={!this.props.button ? true : false}
                        >
                            {this.props.loading ?
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                :
                                "Sign In"

                            }
                        </button>

                        <div className="text-secondary forgot-password"><center>Forgot Password?</center></div>
                    </div>
                </div>
            </div>


        )
    }
}