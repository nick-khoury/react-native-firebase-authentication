// react-native application to demonstrate general authentication with firebase, and handling form input
// basic react native topics covered
// firebase console and configuration for authentication
// handling text input with login form
// state object to tell input what its value should be
// conditional rendering to render different content in components
// gave user feedback with error message and a loading spinner graphic

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

    state = { loggedIn: null };

    componentWillMount() { //lifecycle method

        firebase.initializeApp({
            apiKey: "AIzaSyC13sjQ7gSK7fx8SX2pAm49ww3zmmFlMPg",
            authDomain: "authentication-7dacd.firebaseapp.com",
            databaseURL: "https://authentication-7dacd.firebaseio.com",
            projectId: "authentication-7dacd",
            storageBucket: "authentication-7dacd.appspot.com",
            messagingSenderId: "550786282586"
        });

        firebase.auth().onAuthStateChanged((user) => { // called when user signs in or out
            // user is null when signed out
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }


    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button orPress={() => firebase.auth().signOut()}>
                        Logout Here
                    </Button>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
        
    }


    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}



export default App;



