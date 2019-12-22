import React, { Component } from 'react';
import { withRouter } from "react-router";
import Logo from '../images/Logo.png';
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux";
import SignUp from '../user-auth/sign-up';
import { signUp, signIn } from '../redux/Actions/user';

const PageMetaTags = (
    <MetaTags>
        <title>Inscribed</title>
        <meta name="description" content="Create a new account to access our services." />
        <meta property="og:title" content="Inscribed - Sign Up" />
        <meta property="og:image" content={Logo} />
    </MetaTags>

)

class SignUpController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            button: false
        };
        this.getInputData = this.getInputData.bind(this);
        this.signUp = this.signUp.bind(this);
    };
    
    // Make the button active only when all fields are entered
    getInputData(val) {
        if (val.email && val.password && val.firstName && val.lastName) {
            this.setState({
                button: true
            });
        } else {
            this.setState({
                button: false
            });
        };
        this.setState({
            userInput: val
        });
    };

    signUp() {
        const userInput = this.state.userInput;
        console.log(userInput.email)
        
        // Post the sign up request to the server
        this.props.signUp(userInput.email, userInput.firstName, userInput.lastName, userInput.password, () => {
            if (this.props.signUpResponse.registrated) {
                this.props.signIn(userInput.email, userInput.password, () => {
                    if (this.props.signInResponse.authenticated) {
                        this.props.history.push('/home')
                    };
                });
            };
        });
    };

    render() {
        if (!this.props.authResponse.authenticated) {
            return (
                <>
                    {PageMetaTags}
                    <SignUp
                        sendData={this.getInputData}
                        onSubmit={this.signUp}
                        button={this.state.button}
                        errors={this.props.signUpResponse.errors ? this.props.signUpResponse.errors : undefined}
                        connectionError={this.props.error}
                        loading={this.props.loading}
                    />
                </>
            );
        } else {
            return (
                <>
                    {this.props.history.push("/")}
                </>
            )
        }
    };
};

const mapStateToProps = (state) => {
    return {
        signUpResponse: state.userReducer.signUpResponse,
        signInResponse: state.userReducer.signInResponse,
        loading: state.userReducer.loading,
        error: state.userReducer.error,
        authResponse: state.authReducer.authResponse,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (email, firstName, lastName, password, callback) => {
            dispatch(signUp(email, firstName, lastName, password, callback));
        },
        signIn: (email, password, callback) => {
            dispatch(signIn(email, password, callback))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpController));