import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { getUserFriends } from '../store'
import { FriendCard } from './FriendCard'

class FriendsList extends React.Component{

  render(){
    const userFriends = this.props.friends
    return(
    <View style={styles.container}>
      {userFriends.map(friend => {
        return (
          <View  key={friend.id}>
            <FriendCard
                        id={friend.id}
                        name={friend.name}
                        phone={friend.phone}
                        email={friend.email}
            />
            <Button title="Edit" />
            <Button title="Delete" />
          </View>
        )
      })}
      <View style={styles.bottomView}>
        <Button title="Add Friend" buttonStyle={styles.addBtn} onPress={() => this.props.navigation.navigate('AddFriend')}/>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomView: {
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    position: 'absolute'
  },
  addBtn: {
    backgroundColor: 'red',
    width: '100%'
  }
})

const mapStateToProps = state => ({
  friends: state.user.userFriends
})

const mapDispatchToProps = dispatch => ({
  getFriends: () => {
    return dispatch(getUserFriends())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)
