import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { deleteFriend } from '../store/user'
import { FriendCard } from './FriendCard'

class FriendsList extends React.Component{

  componentDidMount() {
    this.props.navigation.navigate('DrawerClose')
  }

  handleDelete = (userId, friendId) => {
    this.props.deleteFriend(userId, friendId)
  }

  render(){
    const userFriends = this.props.friends
    const userId = this.props.userId
    return (
    <View style={styles.container}>
      <ScrollView>
          {userFriends.map(friend => {
            return (
              <View key={friend.id} style={styles.friendCards}>
                <Icon
                  raised
                  name='close'
                  color='red'
                  onPress={() => this.handleDelete(userId, friend.id)}
                  />
                <FriendCard
                            id={friend.id}
                            name={friend.name}
                            phone={friend.phone}
                            email={friend.email}
                />
                <Icon
                  raised
                  name='create'
                  onPress={() => this.props.navigation.navigate('EditForm', { friendData: {
                  id: friend.id,
                  name: friend.name,
                  phone: friend.phone,
                  email: friend.email
                  }})}
                  />
              </View>
            )
          })}
      </ScrollView>
      <View style={{ height: 60 }}/>
      <View style={styles.bottomView}>
          <Button title='Add Friend' icon={{ name: 'add-circle' }} buttonStyle={styles.addBtn} onPress={() => this.props.navigation.navigate('AddFriend')} />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 100,
    position: 'absolute'
  },
  addBtn: {
    backgroundColor: 'blue',
    width: '100%',
    height: 50
  },
  friendCards: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  friends: state.user.userFriends,
  userId: state.user.user.id
})

const mapDispatchToProps = dispatch => ({
  deleteFriend: (userId, friendId) => {
    return dispatch(deleteFriend(userId, friendId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)
