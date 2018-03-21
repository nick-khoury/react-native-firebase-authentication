import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component {

    state = { email: '', pwd: '', err: '', loading: false };


    onButtonPress() {

        const { email, pwd } = this.state;

        this.setState({ err: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, pwd) // returns promise for request to firebase server
        .then(this.onLoginSuccess.bind(this))
        .catch(() => { // user fails to sign in, attempt to create account
            firebase.auth().createUserWithEmailAndPassword(email, pwd) // returns promise - asyncronous
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this)); // fails to create account and fails to sign in
        });
    }


    onLoginFail() {
        this.setState({
            err: 'Authentication Failed',
            loading: false
        });
    }


    onLoginSuccess() {
        this.setState({ 
            email: '',
            pwd: '',
            loading: false,
            err: ''
         });
    }


    renderButton() { // decides whether to show the spinner for loading
        if (this.state.loading) {
            return <Spinner size="small" />
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login Here
            </Button>
        );
    }


    render() {

        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={text => this.setState({ pwd: text })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.err}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}



const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};



export default LoginForm;


