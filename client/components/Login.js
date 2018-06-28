import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native'
import { SocialIcon, FormLabel, FormInput, FormValidationMessage, Button, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import { login } from '../store/user'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin() {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(user)
        this.props.navigation.navigate('Home', this.state)
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


    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <FormLabel>email</FormLabel>
                <FormInput onChangeText={email => this.setState({email})} />
                <FormValidationMessage>{'Please enter a valid email'}</FormValidationMessage>
                <FormLabel>password</FormLabel>
                <FormInput onChangeText={password => this.setState({password})} />
                <FormValidationMessage>{'Please enter a valid password'}</FormValidationMessage>
                <Button style={styles.button}
                    raised
                    icon={{ name: 'cached' }}
                    title='Login'
                    onPress={this.handleLogin}
                />
                <Text style={styles.createAccount} onPress={()=>console.log('yo')}>Create Account</Text>
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
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    createAccount: {
        color: 'blue',
        textAlign: 'center'
    }
})

const mapDTP = dispatch => {
    return {
        login: (user) => dispatch(login(user))
    }
}

export default connect(null, mapDTP)(Login)