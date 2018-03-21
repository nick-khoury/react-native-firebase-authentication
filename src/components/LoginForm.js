import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input } from './common';


class LoginForm extends Component {

    state = { email: '', pwd: '', err: '' };


    onButtonPress() {

        const {email, pwd } = this.state;

        this.setState({ err: '' });

        firebase.auth().signInWithEmailAndPassword(email, pwd) // returns promise for request to firebase server
        .catch(() => { // user fails to sign in, attempt to create account
            firebase.auth().createUserWithEmailAndPassword(email, pwd) // returns promise - asyncronous
            .catch(() => { // fails to create account and failed to sign in
                this.setState({ err: 'Authentication Failed' });
            });
        });
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
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Login Here
                    </Button>
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


