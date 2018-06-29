import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'

export default class AddFriend extends React.Component {
  state = {
    name: '',
    email: '',
    phone: ''
  }

  // handleSubmit = () => {

  // }

  render () {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <FormLabel>Name</FormLabel>
        <FormInput autoCapitalize='none' autoCorrect={false} onChangeText={name => this.setState({ name })} />
        <FormLabel>Email</FormLabel>
        <FormInput autoCapitalize='none' autoCorrect={false} onChangeText={email => this.setState({ email })}/>
        <FormLabel>Phone</FormLabel>
        <FormInput autoCapitalize='none' autoCorrect={false} onChangeText={phone => this.setState({ phone })}/>
        <View style={styles.bottomView}>
          <Button buttonStyle={styles.submitBtn} title='Submit' onPress={() => this.handleSubmit()} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  submitBtn: {
    backgroundColor: 'red',
    width: '100%'
  },
  bottomView: {
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    position: 'absolute'
  }
})
