import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { logout } from '../store'
import { Icon } from 'react-native-elements'
import { getUserFriends, login } from '../store/user'

class Home extends Component {

  componentDidMount() {
    this.props.navigation.navigate('DrawerClose')
    this.props.getUserFriends(this.props.user.id)
  }

  render() {
    return (
      <View>
        <Header
          backgroundColor='#3FA9F5'
          leftComponent={
            <Icon
            name='menu'
            color='#fff'
            onPress={this.props.navigation.openDrawer}
            underlayColor='#3FA9F5'
            />
          }
          rightComponent={
            <Icon
            name='settings'
            color='#fff'
            onPress={this.props.navigation.openDrawer}
            underlayColor='#3FA9F5'
            />
          }
        />
        <View>
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
            onPress={() => this.props.navigation.navigate('Receipts')}
          />
          {/* <Button title="Logout" onClick={this.props.logoutPress} /> */}
          {/* </View> */}
        </View>
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
  }
})

const mapStateToProps = state => {
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
