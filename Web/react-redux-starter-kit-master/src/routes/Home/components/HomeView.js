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
            macList: ['1', '2'],
            selectedMac: null,
        };
        socket.on('update', this.update);
    }

    componentWillMount() {

    }

    update = (newMacList) => {
        console.log('update', newMacList);
        this.setState({
            macList: newMacList,
        }, function() {console.log('newMacList', this.state)});
    };


    render() {
        console.log('rerender');
        return (
            <div className="homeView">
                <div className="homeViewWrapper">
                    <div className="title">
                        whos<div className="here">here</div>
                    </div>
                    <div className="content">
                        <div className="section" style={this.state.selectedMac === null ? {} : {left: 'calc(-50vw - 200px)'}}>

                            <div className="sectionContent">

                                <div className="listInner">
                                    {
                                        this.state.macList.map(mac => {
                                            return (
                                                    <div className="itemWrapper" onClick={() => {this.setState({selectedMac: mac});}}>
                                                        <div className="address">
                                                            {mac}
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

export default Home;
