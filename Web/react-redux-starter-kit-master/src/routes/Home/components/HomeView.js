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
const socket = require('socket.io-client')('http://localhost:8080');

socket.on('connect', function(){
    console.log('connected to remote server');
});
socket.on('connected', function(){
    console.log('connected');
});

import '../styles/HomeView.scss';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onlineUsers: [{
                firstName: "Jeff",
                lastName: "Doyle",
                address: "1:2:3:4",
                online: true
            }],
            selectedMac: null,
        };
        socket.on('update', this.update);
    }

    componentWillMount() {
        this.props.getUser();
        this.props.getOnline();

        setInterval(this.props.getOnline, 5000);
    }

    update = (newMacList) => {
        console.log('update', newMacList);
        this.setState({
            macList: newMacList,
        }, function() {console.log('newMacList', this.state)});
    };

    render() {

        return (
            <div className="homeView">
                <div className="homeViewWrapper">
                    <div className="title">
                        whos<div className="here">here</div>
                    </div>
                    <div className="welcome">
                        {this.props.user != null ? "Welcome, " + this.props.user.firstName : ""}
                    </div>
                    <div className="content">

                            <div className="sectionContent">

                                <div className="listInner">
                                    Heres who's currently online
                                    {
                                        this.props.online ? this.props.online.map(user => {
                                            return (
                                                    <div className="itemWrapper">
                                                        <div className="address">
                                                            {user.firstName} {user.lastName}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                        :
                                        null
                                    }
                                </div>

                            </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
