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
                    color='white'
                    containerStyle={{backgroundColor: 'red'}}
                    onPress={() => this.handleDelete(userId, friend.id)}
                    />
                  <Icon
                    raised
                    name='create'
                    color='white'
                    containerStyle={{backgroundColor: '#3FA9F5'}}
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
      <View style={{ height: 75 }}/>
      <View style={styles.bottomView}>
          <Button
            raised
            title='Add Friend'
            icon={{ name: 'add-circle' }}
            buttonStyle={styles.addBtn}
            onPress={() => this.props.navigation.navigate('AddFriend')} />
            <View style={{ height: 20 }} />
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
    width: '90%',
    height: 50,
    borderRadius: 5
  },
  friendCards: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icons: {
    flexDirection: 'row'
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
