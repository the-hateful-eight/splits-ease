import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native'
import { SocialIcon, FormLabel, FormInput, FormValidationMessage, Button, Divider } from 'react-native-elements'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin() {
        // const user = {
        //     email: this.state.email,
        //     password: this.state.password
        // }
        // this.props.getUser(user)
        this.props.navigation.navigate('Home')
    }

    // handleCreateAccount() {
    //     this.props.navigation.navigate('CreateAccount')
    // }

    async signInWithGoogleAsync() {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: process.env.ANDROID_GOOGLE_CLIENT_ID,
                iosClientId: process.env.IOS_GOOGLE_CLIENT_ID,
                scopes: ['profile', 'email'],
            })
            if (result.type === 'success') {
                return result.accessToken
            } else {
                return { cancelled: true }
            }
        } catch (e) {
            return { error: true }
        }
    }

    Login() {

    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <FormLabel>email</FormLabel>
                <FormInput onChangeText={console.log('yo')} />
                <FormValidationMessage>{'Please enter a valid email'}</FormValidationMessage>
                <FormLabel>password</FormLabel>
                <FormInput onChangeText={console.log('yo')} />
                <FormValidationMessage>{'Please enter a valid password'}</FormValidationMessage>
                <Button buttonStyle={styles.logInBtn}
                    raised
                    icon={{ name: 'cached' }}
                    title='Login'
                    onPress={this.handleLogin}
                />
                <Button title="Create Account" buttonStyle={styles.createAccount} onPress={() => this.props.navigation.navigate('CreateUserForm')} />
                <SocialIcon
                    title='Sign In With Google'
                    button
                    type='google-plus-official'
                    onPress={this.signInWithGoogleAsync.bind(this)}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    logInBtn: {
        backgroundColor: 'gray'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    createAccount: {
        backgroundColor: 'blue'
        // textAlign: 'center'
    }
})
