import React, { Component } from 'react';
import './sign-in.css';
import { Link } from 'react-router-dom';
import SocialSignIn from './social-sign-in';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    onInputChange() {
        var emailInput = this.emailInput.value;
        var firstNameInput = this.firstNameInput.value;
        var lastNameInput = this.lastNameInput.value;
        var passwordInput = this.passwordInput.value;

        var data = {
            email: emailInput,
            firstName: firstNameInput,
            lastName: lastNameInput,
            password: passwordInput

        };
        this.props.sendData(data);
    };

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
        const signPageClass = darkMode ? "sing-page-dark" : "sign-page"
        return (
            <div>
                <div onKeyPress={(e) => this.handleKeyPress(e)} className={"container " + signPageClass}>

                    <div className="sign-up-container">
                        <h2 className="sign-title text-center">Create a new account</h2>
                        <SocialSignIn />
                        <div className="text-secondary" id="route-text"><center><Link className="route-link" to="/user/signin">Already have an account?</Link></center></div>
                        <input type="email"
                            className="form-control sign-input border-top-0 border-right-0 border-left-0"
                            aria-describedby="emailHelp"
                            placeholder="Email Address"
                            onChange={this.onInputChange}
                            maxLength="200"
                            ref={(input) => { this.emailInput = input; }}

                        />
                        <br />
                        <input type="username"
                            className="form-control sign-input border-top-0 border-right-0 border-left-0"
                            placeholder="First Name"
                            onChange={this.onInputChange}
                            maxLength="10"
                            ref={(input) => { this.firstNameInput = input; }}

                        />
                        <br />
                        <input type="username"
                            className="form-control sign-input border-top-0 border-right-0 border-left-0"
                            placeholder="Last Name"
                            onChange={this.onInputChange}
                            maxLength="10"
                            ref={(input) => { this.lastNameInput = input; }}

                        />
                        <br />
                        <input type="password"
                            className="form-control sign-input border-top-0 border-right-0 border-left-0"
                            aria-describedby="passwordHelp"
                            placeholder="Password"
                            maxLength="200"
                            onChange={this.onInputChange}
                            ref={(input) => { this.passwordInput = input; }}

                        />


                        {this.props.errors !== undefined ? (
                            <div
                                className="text-danger error-message">
                                {this.props.errors.email_error} <br />
                                {this.props.errors.password_error}

                            </div>
                        ) :   "" }

                        {this.props.connectionError ? (
                            <div
                                className="text-danger error-message">
                                Something is wrong, try again later
                            </div>
                        ) :  ""  }


                        <br/>
                        <div className="terms-section">
                            By creating an account, you hereby that you agree to our terms and policies
                        </div>
                        <br/>

                        <button
                            className="btn sign-button"
                            onClick={this.props.onSubmit}
                            disabled={!this.props.button ? true : false} >
                            {this.props.loading ?
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>  : "Sign Up" }
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}