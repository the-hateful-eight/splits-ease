import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import { deleteFriend } from '../store/user'
import { FriendCard } from './FriendCard'

class FriendsList extends React.Component{

  componentDidMount() {
    this.props.navigation.navigate('DrawerClose')
  }

  handleDelete = (userId, friendId) => {
    Alert.alert(
      'Delete Friend',
      'Are you sure?',
      [ {text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.props.deleteFriend(userId, friendId)}
      ]
    )
  }

  render(){
    const userFriends = this.props.friends
    const userId = this.props.userId
    return (
    <View style={styles.container}>
      <ScrollView>
          {userFriends.map(friend => {
            return (
              <Card key={friend.id} title={friend.name} >
                <Image
                  source={{ uri: 'https://cdn3.iconfinder.com/data/icons/yumminky-pc/100/yumminky-pc-43-512.png'}}
                  style={styles.avatar}
                  />
                <View style={styles.friendCards}>
                <FriendCard
                            id={friend.id}
                            name={friend.name}
                            phone={friend.phone}
                            email={friend.email}
                />
                <View style={styles.icons}>
                  <Icon
                    raised
                    name='close'
                    // color='red'
                    onPress={() => this.handleDelete(userId, friend.id)}
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
                </View>
              </Card>
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
    backgroundColor: '#3FA9F5',
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2
  },
  friendCards: {
    flex: 1,
    // paddingTop: 12,
    // paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icons: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly'
  },
  avatar: {
    width: '100%',
    height: 200
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
