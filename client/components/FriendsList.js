import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { getUserFriends } from '../store'

class FriendsList extends React.Component{

  renderFriends(){
    const friends = this.props.userFriends
    if(friends.length){
      for (let i = 0; i < friends.length; i++) {
        return friends[i]
      }
    }
  }

  componentDidMount(){
    this.props.getUserFriends()
  }

  render(){
    return(
    <View>
      Hello Friends!{this.renderFriends()}
    </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getFriends: () => {
    return dispatch(getUserFriends())
  },
})

export default connect(null, mapDispatchToProps)(FriendsList)
