import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux'
import { createUser } from '../store/user'

class CreateUserForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    phone: ''
  }

  handleSubmit = () => {
    this.props.createUser(this.state)
  }

  render () {
    return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <FormLabel>Name</FormLabel>
      <FormInput autoCorrect={false} onChangeText={name => this.setState({ name })} />
      <FormLabel>Email</FormLabel>
      <FormInput autoCorrect={false} onChangeText={email => this.setState({ email })}/>
      <FormLabel>Password</FormLabel>
      <FormInput autoCorrect={false} onChangeText={password => this.setState({ password })}/>
      <FormLabel>Phone</FormLabel>
      <FormInput autoCorrect={false} onChangeText={phone => this.setState({ phone })}/>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  createUser: (user) => dispatch(createUser(user))
    .then((res) => {
      if (res){ownProps.navigation.navigate('Home')}
    })
})

export default connect(null, mapDispatchToProps)(CreateUserForm)
