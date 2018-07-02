import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../store'
import { getUserFriends } from '../store/user'

class Home extends Component {

  componentDidMount () {
    console.log('USER CDM HERE!!!!!')
    this.props.getUserFriends(this.props.user.id)
  }

  render() {
    console.log('USER RENDER HERE!!!')
    return (
      <View style={styles.container}>
        <Text>Welcome to SPLITS/ease, {this.props.user.name}</Text>
        <Button
          title="Take a picture"
          onPress={() => this.props.navigation.navigate('ReceiptCamera')}
        />
        <Button
          title="Friends List"
          onPress={() => this.props.navigation.navigate('FriendsList')}
        />
        <Button
          title="Receipt List"
          onPress={() => this.props.navigation.navigate('ReceiptList')}
        />
        {/* <Button title="Logout" onClick={this.props.logoutPress} /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state => {
  console.log('USER MSTP HERE!!!!!')
  return {
    user: state.user.user,
    userFriends: state.user.userFriends
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutPress: () => {
      dispatch(logout())
      .then(() => {
        ownProps.navigation.navigate('Home')
      })
    },
    getUserFriends: (id) => {
      dispatch(getUserFriends(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
