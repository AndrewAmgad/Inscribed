import React, { Component } from 'react';
import { withRouter } from "react-router";
import SignIn from '../user-auth/sign-in';
import MetaTags from 'react-meta-tags';
import Logo from '../images/Logo.png';
import { connect } from "react-redux";
import { signIn } from "../redux/Actions/user";



const PageMetaTags = (
    <MetaTags>
        <title>Inscribed</title>
        <meta name="description" content="Log into Inscribed" />
        <meta property="og:title" content="Inscribed - Sign In" />
        <meta property="og:image" content={Logo} />
    </MetaTags>
)

class SignInController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            button: false
        }

        this.getInputData = this.getInputData.bind(this);
        this.signIn = this.signIn.bind(this);
    };

    getInputData(val) {
        // Make the button active only when all fields are entered
        if (val.email && val.password) {
            this.setState({
                button: true
            });

        } else {
            this.setState({
                button: false
            })
        }

        this.setState({
            email: val.email,
            password: val.password
        })
    }

    signIn() {
        this.props.signIn(this.state.email, this.state.password, () => {
            if (this.props.response.authenticated) {
                this.props.history.push("/home")
            }
        })

    }


    render() {
        var error = ""
        if(this.props.error){
            error = "Something is wrong, please try again later";
        } else {
            if(this.props.response.error){
                error = this.props.response.error;
            }
        };

        if (!this.props.authResponse.authenticated) {
            return (
                <>
                    {PageMetaTags}
                    <SignIn
                        sendData={this.getInputData}
                        onSubmit={this.signIn}
                        button={this.state.button}
                        errorValue={error}
                        loading={this.props.loading}
                    />
                </>
            )
        } else {
            return (
                <>
                   { this.props.history.push("/")}
            </>
            )

        }
    }
};

const mapStateToProps = (state) => {
    return {
        response: state.userReducer.signInResponse,
        loading: state.userReducer.loading,
        error: state.userReducer.error,
        authResponse: state.authReducer.authResponse,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password, callback) => {
            dispatch(signIn(email, password, callback));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInController))

