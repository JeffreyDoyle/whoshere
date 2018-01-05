// import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'
//
// export const HomeView = () => (
//   <div>
//     <h4>Welcome!</h4>
//     <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
//   </div>
// )
//
// export default HomeView
import React, { Component } from 'react';

import '../styles/Login.scss';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLogin: false,
            selectedSignup: false,

            selectedLoginError: false,
            selectedSignupError: false,
        };
    }

    componentWillMount() {

    }

    update = () => {

    };

    signUp = () => {
        let address = document.getElementById('signup-macaddress').value;
        let firstName = document.getElementById('signup-firstname').value;
        let lastName = document.getElementById('signup-lastname').value;
        let password = document.getElementById('signup-password').value;

        console.log(address, firstName, lastName, password);

        if (address === '' || address === null || password === '' || password === null || firstName === '' || firstName === null || lastName === '' || lastName === null) {
            this.setState({
                selectedSignupError: true,
            });
        } else {
            this.setState({
                selectedSignupError: false,
            });
            this.props.createProfile(address, firstName, lastName, password);
        }
    }

    signIn = () => {
        let address = document.getElementById('signin-macaddress').value;
        let password = document.getElementById('signin-password').value;

        console.log('signin', address === '', password === '', address, password);

        if (address === '' || address === null || password === '' || password === null) {
            this.setState({
                selectedLoginError: true,
            });
        } else {
            this.setState({
                selectedLoginError: false,
            });
            this.props.login(address, password);
        }
    }


    render() {
        return (
            <div className="loginView">
                <div className="homeViewWrapper" style={this.state.selectedLogin === false ? (this.state.selectedSignup === false ? {} : {background: 'linear-gradient(to right, #e47878, #c105aa)'}) : {background: 'linear-gradient(to right, #a1e478, #05c136)'}}>
                    <div className="title">
                        {this.state.selectedLogin === false ? (this.state.selectedSignup === false ? 'Authentication' : 'Sign Up!') : 'Login'}
                    </div>
                    <div className="content">
                        <div className="section">

                            <div className="sectionContent">

                                <div className="listInner" style={(this.state.selectedLogin === false && this.state.selectedSignup === false) ? {display: 'block'} : {display: 'none'}}>
                                    <div className="itemWrapper" onClick={() => {this.setState({selectedLogin: true})}}>
                                        <div className="loginButton" onClick={() => {this.setState({selectedLogin: true})}}>
                                            Login
                                        </div>
                                    </div>
                                    <div className="itemWrapper" onClick={() => {this.setState({selectedSignup: true})}}>
                                        <div className="signupButton" onClick={() => {this.setState({selectedSignup: true})}}>
                                            Sign Up
                                        </div>
                                    </div>
                                </div>


                                <div className="listInner" style={(this.state.selectedLogin === true) ? {display: 'block'} : {display: 'none'}}>

                                    <div className="loginWrapper">
                                        <div className="goBack" onClick={() => {this.setState({selectedLogin: false});}}>
                                            Go Back.
                                        </div>
                                        <div className="inputField">
                                            <input id="signin-macaddress" type="text" name="fname" placeholder="MAC Address" />
                                        </div>
                                        <div className="inputField">
                                            <input id="signin-password" type="password" name="password" placeholder="Password" />
                                        </div>
                                        <div className="actionButtonWrapper" >
                                            <div className="actionButton" onClick={() => {this.signIn()}}>
                                                Sign In
                                            </div>
                                        </div>
                                        <div className="errorText" style={this.state.selectedLoginError === true ? {display: 'block'} : {display: 'none'}}>
                                            One or more of the fields are incorrect.
                                        </div>
                                    </div>

                                </div>


                                <div className="listInner" style={(this.state.selectedSignup === true) ? {display: 'block'} : {display: 'none'}}>

                                    <div className="loginWrapper">
                                        <div className="goBack" onClick={() => {this.setState({selectedSignup: false});}}>
                                            Go Back.
                                        </div>
                                        <div className="inputField">
                                            <input id="signup-firstname" type="text" name="fname" placeholder="First Name" />
                                        </div>
                                        <div className="inputField">
                                            <input id="signup-lastname" type="text" name="lname" placeholder="Last Name" />
                                        </div>
                                        <div className="inputField">
                                            <input id="signup-password" type="password" name="password" placeholder="Password" />
                                        </div>
                                        <div className="inputField">
                                            <input id="signup-macaddress" type="text" name="address" placeholder="MAC Address" />
                                        </div>
                                        <div className="actionButtonWrapper">
                                            <div className="actionButton" onClick={() => {this.signUp()}}>
                                                Sign Up!
                                            </div>
                                        </div>
                                        <div className="actionButtonWrapper" style={this.state.selectedSignupError === true ? {display: 'block'} : {display: 'none'}}>
                                            <div className="errorText">
                                                One or more of the fields are incorrect.
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
