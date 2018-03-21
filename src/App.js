import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { Header } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

    state = { loggedIn: false };

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
            // user is null when signing out
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                <LoginForm />
            </View>
        );
    }
}



export default App;



