import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

class FriendsList extends React.Component{

  renderFriends(){
    if(this.props.friends.length){
      let friends = []
    }
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
    return dispatch(getFriends())
  },
})

export default connect(null, mapDispatchToProps)(FriendsList)
