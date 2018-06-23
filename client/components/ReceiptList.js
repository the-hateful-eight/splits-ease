import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

class FriendsList extends React.Component{

  renderFriends(){
    if(this.props.friends.length){
      let receipts = []
    }
  }

  render(){
    return(
    <View>
        Receipts should be here, yo! 
    </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getReceipts: () => {
    return dispatch(getReceipts())
  },
})

export default connect(null, mapDispatchToProps)(FriendsList)
