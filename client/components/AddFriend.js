import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux'
import { addFriend } from '../store/user'

class AddFriend extends React.Component {
  state = {
    name: '',
    email: '',
    phone: '',
    userId: this.props.id
  }

  handleSubmit = () => {
    this.props.addFriend(this.state, this.props.id)
  }

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

const mapStateToProps = state => ({
  id: state.user.user.id
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addFriend: (friend, id) => dispatch(addFriend(friend, id))
    .then((res) => {
      if (res){ownProps.navigation.navigate('FriendsList')}
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
