import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../store'
import { login } from '../store/user'

class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to SPLITS/ease, {this.props.user.user.name}</Text>
        <Button
          title="Take a picture"
          onPress={() => this.props.navigation.navigate('ReceiptCamera')}
        />
        <Button
          title="Receipt Form"
          onPress={() => this.props.navigation.navigate('ReceiptForm')}
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
  console.log('STATE IS',state)
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
