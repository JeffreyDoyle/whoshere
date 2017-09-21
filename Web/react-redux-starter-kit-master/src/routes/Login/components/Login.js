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
            macList: ['1', '2'],
            selectedMac: null,
        };
    }

    componentWillMount() {

    }

    update = () => {
    };


    render() {
        return (
            <div className="loginView">
                <div className="homeViewWrapper">
                    <div className="title">
                        Authentication<div className="here"></div>
                    </div>
                    <div className="content">
                        <div className="section" style={this.state.selectedMac === null ? {} : {left: 'calc(-50vw - 200px)'}}>

                            <div className="sectionContent">

                                <div className="listInner">
                                    {
                                        this.state.macList.map(mac => {
                                                return (
                                                    <div className="itemWrapper" onClick={() => {this.setState({selectedMac: mac});}}>
                                                        <div className="loginButton">
                                                            Login
                                                        </div>
                                                        <div className="signupButton">
                                                            Sign Up
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>


                                <div className="listInner">

                                    <div className="itemWrapper" onClick={() => {this.setState({selectedMac: null});}}>
                                        <div className="address">
                                            {this.state.selectedMac}
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
