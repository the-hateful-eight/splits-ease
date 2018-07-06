import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import ReceiptCard from './ReceiptCard'
import { connect } from 'react-redux'
import { getUserReceipts } from '../store/user'

class ReceiptList extends React.Component {
  componentDidMount() {
    this.props.getUserReceipts(this.props.userId)
  }

  render() {
    const receipts = this.props.receipts
    return !receipts.length ? (
      <View><Text>Loading...</Text></View>
    ) : (
      <View>
        {receipts.map(receipt => (
          <ReceiptCard key={receipt.id} receipt={receipt}
          />
        ))}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return{
    receipts: state.user.userReceipts,
    userId: state.user.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getUserReceipts: (userId) => {
    return dispatch(getUserReceipts(userId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptList)
