import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'http2'
import { logout } from '../store'

const Home = props => {
  const { logoutPress } = props

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
  return (
    <View style={styles.container}>
      <Text>Welcome to SPLITS/ease</Text>
      <Button
        title="Take a picture"
        onPress={() => props.navigation.navigate('ReceiptCamera')}
      />
      <Button
        title="Receipt Form"
        onPress={() => props.navigation.navigate('ReceiptForm')}
      />
      <Button
        title="Receipt List"
        onPress={() => props.navigation.navigate('ReceiptList')}
      />
      <Button title="Logout" onClick={logoutPress} />
    </View>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutPress: () => {
      dispatch(logout()).then(() => {
        ownProps.history.push('/')
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Home)
