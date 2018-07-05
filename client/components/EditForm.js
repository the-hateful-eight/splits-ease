import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Card, FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux';
import { editFriend } from '../store/user'

class EditForm extends React.Component {
  state = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }

  componentDidMount () {
    const friendData = this.props.navigation.state.params.friendData
    this.setState({
      id: friendData.id,
      name: friendData.name,
      email: friendData.email,
      phone: friendData.phone
   })
  }

  handleSubmit = (friendId) => {
    this.props.editFriend(this.props.userId, {...this.state, id: friendId})
  }

  render () {
    const friendData = this.props.navigation.state.params.friendData
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Card>
        <FormLabel>Name</FormLabel>
        <FormInput autoCapitalize='none' autoCorrect={false} onChangeText={name => this.setState({ name })} value={this.state.name} />
        <FormLabel>Email</FormLabel>
        <FormInput autoCapitalize='none' autoCorrect={false} onChangeText={email => this.setState({ email })} value={this.state.email} />
        <FormLabel>Phone</FormLabel>
        <FormInput autoCapitalize='none' autoCorrect={false} onChangeText={phone => this.setState({ phone })} value={this.state.phone} />
        <View style={styles.bottomView}>
        </View>
        </Card>
        <View style={{height: 15}}/>
        <Button
            raised
            buttonStyle={styles.submitBtn}
            title='Submit'
            onPress={() => this.handleSubmit(friendData.id)} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  submitBtn: {
    borderRadius: 5,
    backgroundColor: '#3FA9F5',
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
  userId: state.user.user.id
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  editFriend: (userId, updatedData, friendId) => dispatch(editFriend(userId, updatedData, friendId))
    .then((res => {
      if (res){ownProps.navigation.navigate('FriendsList')}
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)
