import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login';

import Header from './Header';
import '../App.css';
import logo from '../logo.svg';


export class Facebook extends Component {

    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    componentClicked = () => console.log('clicked');

    responseFacebook = (response) => {
        console.log(response)
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
    }

    render() {
        let fbContent;

        if( this.state.isLoggedIn ) {
            fbContent = (
                <div style={{
                    width: '400px',
                    padding: '20px'
                }}>
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome {this.state.name}</h2>
                    <p>Email: {this.state.email}</p>
                </div>
            )
        }else {
            fbContent = (<FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={true}
                // reAuthenticate={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} 
                />)
        }

        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        {this.state.isLoggedIn ? '' : <Header />}
                        {fbContent}
                    </header>
                </div>
            </div>
        )
    }
}

export default Facebook;
