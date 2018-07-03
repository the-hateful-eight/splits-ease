import React, { Component } from 'react'
import { View, Text } from 'react-native'
import ReceiptCard from './ReceiptCard'
import { connect } from 'tls';

const dummyReceipts = [
  {
    merchantName: 'CourtDudes',
    address: 'The Courts, Bro',
    phone: '1-555-1234',
    date: '6-20-2018',
    id: 1,
  },
  {
    merchantName: 'Contract For Hire',
    address: 'The depts of heck',
    phone: '1-123-1234',
    date: '5-23-2016',
    id: 2,
  },
]

class ReceiptList extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {},
      receipts: []
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      receipts: dummyReceipts
    })
  }

  render(){
    const { receipts } = this.state
    return receipts === 'undefined' ? <View>Loading...</View>
    : (
      <View>
          {
            receipts.map(receipt => <ReceiptCard key={receipt.id} receipt={receipt} />)
          }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  receipts: state
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptList)

