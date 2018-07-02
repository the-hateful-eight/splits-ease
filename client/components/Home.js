import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { logout } from '../store'
import { Icon } from 'react-native-elements'
import { getUserFriends, login } from '../store/user'

class Home extends Component {
  // static navigationOptions = {
  //   drawerLabel: 'Home',
  //   drawerIcon: ({ tintColor }) => (
  //     <Icon
  //       name="home"
  //       size={30}
  //       iconStyle={{
  //         width: 30,
  //         height: 30
  //       }}
  //       type="material"
  //       color={tintColor}
  //     />
  //   ),
  // }

  componentDidMount() {
    this.props.getFriends(this.props.user.user.id)
  }

  render() {
    console.log('FRIENDS ARE HERE', this.props.user.userFriends)
    this.props.navigation.openDrawer()
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff'}}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        {/* <View style={styles.container}> */}
          <Text>Welcome to SPLITS/ease, {this.props.user.user.name}</Text>
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
  console.log('STATE IS', state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutPress: () => {
      dispatch(logout()).then(() => {
        ownProps.navigation.navigate('Home')
      })
    },
    getFriends: (id) => {
      dispatch(getUserFriends(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
