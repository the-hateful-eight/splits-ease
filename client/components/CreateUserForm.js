import React from 'react'
import { StyleSheet, View } from 'react-native'
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
    console.log(this.state)
    this.props.createUser(this.state)
    this.props.navigation.navigate('Home')
  }

  render () {
    return (
    <View style={styles.container}>
      <FormLabel>Name</FormLabel>
      <FormInput onChangeText={name => this.setState({ name })} />
      <FormLabel>Email</FormLabel>
      <FormInput onChangeText={email => this.setState({ email })}/>
      <FormLabel>Password</FormLabel>
      <FormInput onChangeText={password => this.setState({ password })}/>
      <FormLabel>Phone</FormLabel>
      <FormInput onChangeText={phone => this.setState({ phone })}/>
      <View style={styles.bottomView}>
      <Button buttonStyle={styles.submitBtn} title='Submit' onPress={() => this.handleSubmit()} />
      </View>
    </View>
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

const mapDispatchToProps = dispatch => ({
  createUser: (user) => dispatch(createUser(user))
})

export default connect(null, mapDispatchToProps)(CreateUserForm)
