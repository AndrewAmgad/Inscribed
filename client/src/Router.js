import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home/home.js';
import SignInController from './pages/sign-in-page';
import SignUpController from './pages/sign-up-page';

export default class Router extends Component {
    render() {
        return (
            <Switch >
                    
                    <Route exact path='/home'  component={HomePage}/>
                    <Route path="/user/signin" render={(props) => <SignInController {...props} />} />
                    <Route path="/user/signup" render={(props) => <SignUpController {...props} /> } />
                    <Route component={HomePage} />  
                

            </Switch>
        )
    }
}